
import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../handlers/Input';


function DelUser() {
  const [data, setData] = useState([]);
  const [dataErr, setErrData] = useState([]);
  const [inputfield, setInputField] = useState('');


  function DeleteUsersByID() {
    const url = '/admin/deleteuser/';

    axios
      .delete(url + inputfield)
      .then((res) => {
        const responseData = res.data.replace(/}{/g, '},{');
        const jsonArray = `[${responseData}]`;
        const jsonData = JSON.parse(jsonArray);
        const ArrayData = jsonData[1].message;
        const ArrayError = jsonData[1].error;
        setData(ArrayData);
        setErrData(ArrayError)
      })
  }


  return (
    <div>
      <h2>Delete User by ID</h2>
      <p>{data}</p>
      <p>{dataErr}</p>
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

      </div>
      <br />
      <button onClick={DeleteUsersByID}>Delete user</button>
    </div>
  );
}
export default DelUser