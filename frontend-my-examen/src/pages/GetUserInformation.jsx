

import React, { useState, useEffect } from 'react';
import axios from 'axios';


function GetUserInformation() {
  const [data, setData] = useState("");

  const url = "/admin/user-validate-res";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const responseData = res.data;
        setData(responseData.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const dataArray = Object.entries(data);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div>
        <h1 className="text-center text-6xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">
          Welcome: {data.Name}
        </h1>
      </div>
      <p className="text-center mt-10 text-2xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">
        Your Personal information:
      </p>

      <div>
        <table className='text-white'>
          <thead>
            <tr>
              <th>Parameters:</th>
              <th>User information:</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map(([key, value]) => (
              <tr key={key}>
                <th className='flex'>{key}:</th>
                <td>{JSON.stringify(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}
export default GetUserInformation;

