import { useState, useEffect } from 'react';

function Products() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const jsonData = await response.json();
        setData(jsonData.results[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <h1>Random api</h1>
      <p>Randomises a new user when the pages refreshes</p>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>City</th>
            <th>Country</th>
            <th>Nationality</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.name?.title}</td>
            <td>{data?.name?.first}</td>
            <td>{data?.name?.last}</td>
            <td>{data?.location?.city}</td>
            <td>{data?.location?.country}</td>
            <td>{data?.nat}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Products;
