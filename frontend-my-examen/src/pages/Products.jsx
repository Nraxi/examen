import { useState, useEffect } from 'react';

function Products() {

  function Generate() {
    const [items, setItems] = useState([])

    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setItems(data.drinks))
        .catch(err => console.error(err));
    }, [])

    return items;
  }

  let data = Generate();
  console.log(data);
  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>LIBELLE</th>
            <th>hey</th>
          </tr>
        </thead>
        <tbody>
          {data.map(u => {
            return (
              <tr key={u.idDrink}>
                <td>{u.idDrink}</td>
                <td>{u.strDrink}</td>
                <td>{u.strAlcoholic}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Products;
