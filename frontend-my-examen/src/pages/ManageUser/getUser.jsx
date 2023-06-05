import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../handlers/Input';

function GetUser() {
  const [data, setData] = useState("");
  const [inputfield, setInputField] = useState('');
  const [, setResetList] = useState(false);


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
        // console.log("arraydb", ArrayData);
      })
      .catch((err) => console.error(err));
  }

  function handleResetList() {
    setData([]);
    setResetList(true);
  }

  return (
    <div className="grid md:grid-cols-3">
      <h3 className="mb-10 col-span-3 md:col-start-2 md:col-span-1 text-center mt-10 text-2xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">
        GET User by ID</h3>
      <div className="mb-2 col-span-3 md:col-start-2 md:col-span-1 row-start-2 p-4 rounded backdrop-blur bg-white/50">

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
          {data && data.ID && (
            <React.Fragment>
              <p>ID: {data.ID}</p>
              <p>Name: {data.name}</p>
              <p>Email: {data.email}</p>
              <p>Password: {data.password}</p>
              <p>Created: {data.CreatedAt}</p>
              <p>Latest Update: {data.UpdatedAt}</p>
              <p>Deleted: {data.DeletedAt}</p>
            </React.Fragment>
          )}
        </div>

        <button onClick={GetUsersFromApi}>Click</button>
        <button onClick={handleResetList}>Reset List</button>
      </div>
    </div>
  );
}

export default GetUser;
