
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
    <div className="grid md:grid-cols-3">
      <h3 className="mb-10 col-span-3 md:col-start-2 md:col-span-1 text-center mt-10 text-2xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">
        Delete User by ID</h3>
      <div className="mb-2 col-span-3 md:col-start-2 md:col-span-1 row-start-2 p-4 rounded backdrop-blur bg-white/50">
        <h2>Put in the ID of the user you want to delete</h2>
        <p>{data}</p>
        <p>{dataErr}</p>
        <form>
          <Input
            type="text"
            name="inputfield"
            id="inputfield"
            title="id: "
            autoComplete="inputfield-new"
            className="px-10 py-2 mt-2 rounded sm:ml-2"
            onChange={(event) => setInputField(event.target.value)}
          />
        </form>

        <div>

        </div>
        <br />
        <button
          className='block mx-auto mt-2 bg-red-400 hover:bg-red-800 text-gray-800 font-semibold py-0 px-4 border border-gray-400 rounded shadow'
          onClick={DeleteUsersByID}>Delete user</button>
      </div>
    </div>
  );
}
export default DelUser