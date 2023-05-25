

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StartpageLoggedIn() {
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
    <div>
      <div>
        <h3>Welcomme: {data.Name}</h3>

      </div>

      <p>Your user information:</p>
      <table>
        <thead>
          <tr>
            <th>Parameters:</th>
            <th>User information:</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map(([key, value]) => (
            <tr key={key}>
              <th>{key}</th>
              <td>{JSON.stringify(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StartpageLoggedIn;

