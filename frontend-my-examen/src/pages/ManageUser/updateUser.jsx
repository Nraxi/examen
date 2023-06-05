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
        <div className="grid md:grid-cols-3">
          <h3 className="mb-10 col-span-3 md:col-start-2 md:col-span-1 text-center mt-10 text-2xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">
            Update an user/account:</h3>
          <div className="mb-2 col-span-3 md:col-start-2 md:col-span-1 row-start-2 p-4 rounded backdrop-blur bg-white/50">

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
        </div>
      </div>
    </>

  )
}


export default UpdateUser