import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import Input from '../../handlers/Input'
import axios from 'axios'




function UpdateUser() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [newemail, setNewEmail] = useState("")
  const [resData, setResData] = useState("")
  const [message, setMessage] = useState("")


  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get('/admin/getusers')
      .then((response) => {
        const responseData = response.data.replace(/}{/g, '},{');
        const jsonArray = `[${responseData}]`;
        const jsonData = JSON.parse(jsonArray);
        const users = jsonData.flatMap((obj) => obj.users || []);
        console.log(users, 'users');

        const user = users.find((user) => user.email === email);
        console.log('user id array:', user);
        if (user) {
          const userId = user.ID.toString();

          console.log('User ID:', userId);

          const Body = {
            name: name,
            email: newemail,
          };
          console.log('POST', userId, Body);

          axios
            .put('/admin/updateuser/' + userId, Body)
            .then((res) => {
              const responseData = res.data.replace(/}{/g, '},{');
              const jsonArray = `[${responseData}]`;
              const jsonData = JSON.parse(jsonArray);
              const data = jsonData[1].user;
              setResData(data)
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setMessage('Error: Email not found');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function RefreshPage() {
    window.location.reload();
  }


  return (
    <>
      <div>
        <h3>Update an user/account:</h3>
        <p>Put in your email to change any parameters</p>
        <div>
          <Form>
            <Input
              type="text"
              name="email"
              id="email"
              value={email}
              title="Your email: "
              autoComplete="email-new"
              className="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <Input
              type="text"
              name="newemail"
              id="newemail"
              value={newemail}
              title="New email: "
              autoComplete="newemail-new"
              className="newemail"
              onChange={(event) => setNewEmail(event.target.value)}
            />



            <Input
              type="text"
              name="name"
              id="name"
              title="Name: "
              autoComplete="name-new"
              className="name"
              onChange={(event) => setName(event.target.value)}
            />

          </Form>
          <span>{message}</span><br />
          <button onClick={handleSubmit}>Submit</button>
          <div>
            <h4>Response:</h4>
            <p>new name: {resData.name}</p>
            <p>new email: {resData.email}</p>
            <p>To refresh page:<button onClick={RefreshPage}>Click here</button></p>
          </div>
        </div>

      </div >
    </>
  )
}


export default UpdateUser