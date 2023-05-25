import axios from 'axios'
import React, { useState } from 'react'

function GetUsers() {
  const [data, setData] = useState([])
  const [showTable, setShowTable] = useState(true)



  function GetUsersFromApi() {
    const url = "/admin/getusers"

    axios.get(url)
      .then((res) => {
        const responseData = res.data.replace(/}{/g, '},{');
        const jsonArray = `[${responseData}]`;
        const jsonData = JSON.parse(jsonArray);
        const ArrayData = jsonData[1].users
        setData(ArrayData);
      })
      .catch((err) => console.error(err));
  }

  function handleToggleTable() {
    if (showTable) {
      setShowTable(false);
      setData([]); // Reset data to empty when hiding the table
    } else {
      setShowTable(true);
    }
  }

  return (
    <div>
      <h2>GET Users:</h2>
      <button onClick={GetUsersFromApi}>Get users</button>

      {showTable && data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>DeletedAt</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{user.ID}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.CreatedAt}</td>
                <td>{user.UpdatedAt}</td>
                <td>{user.DeletedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={handleToggleTable}>
        {showTable ? 'Hide Table' : 'Show Table'}
      </button>
    </div>
  )
}

export default GetUsers
