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

    <div className="grid md:grid-cols-3">
      <h3 className="mb-10 col-span-3 md:col-start-2 md:col-span-1 text-center mt-10 text-2xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">
        GET Users:</h3>
      <div className="mb-2 col-span-3 md:col-start-2 md:col-span-1 row-start-2 p-4 rounded backdrop-blur bg-white/50">

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

        <button className='ml-10' onClick={handleToggleTable}>
          {showTable ? 'Hide Table' : 'Show Table'}
        </button>
      </div>
    </div>
  )
}

export default GetUsers
