import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../handlers/Input';

function GetUser() {
  const [data, setData] = useState([]);
  const [inputfield, setInputField] = useState('');
  const [resetList, setResetList] = useState(false);

  function GetUsersFromApi() {
    const url = '/admin/getuser/';

    axios
      .get(url + inputfield)
      .then((res) => {
        const responseData = res.data.replace(/}{/g, '},{');
        const jsonArray = `[${responseData}]`;
        const jsonData = JSON.parse(jsonArray);
        const ArrayData = jsonData[1].users;
        setData(ArrayData);
      })
      .catch((err) => console.error(err));
  }

  function handleResetList() {
    setData([]);
    setResetList(true);
  }

  return (
    <div>
      <h2>GET User by ID</h2>
      <form>
        <Input
          type="text"
          name="inputfield"
          id="inputfield"
          title="id: "
          autoComplete="inputfield-new"
          className="inputfield"
          onChange={(event) => setInputField(event.target.value)}
        />
      </form>

      <div>
        <p>ID: {data.ID}</p>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Password: {data.password}</p>
        <p>Created: {data.CreatedAt}</p>
        <p>Latest Update: {data.UpdatedAt}</p>
        <p>Deleted: {data.DeletedAt}</p>
      </div>

      <button onClick={GetUsersFromApi}>Click</button>
      <button onClick={handleResetList}>Reset List</button>
    </div>
  );
}

export default GetUser;
