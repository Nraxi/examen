import React, { useState, useRef } from 'react'
import { Form } from 'react-router-dom'
import Input from '../../handlers/Input'
import axios from 'axios'




function AddUser() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);


  const handleSubmit = (event) => {
    event.preventDefault();

    const Body = {
      name: name,
      email: email,
      password: password,
    }

    nameRef.current.value = ""
    emailRef.current.value = ""
    passwordRef.current.value = ""

    console.log(Body);
    axios.post("/v1/signup", Body)
      .then((res) => {
        setMessage(res.data.status)
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      })

  }

  // console.log(message);




  return (
    <>
      <div className="grid md:grid-cols-3">
        <h3 className="mb-10 col-span-3 md:col-start-2 md:col-span-1 text-center mt-10 text-2xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">
          Create an user/account</h3>
        <div className="mb-2 col-span-3 md:col-start-2 md:col-span-1 row-start-2 p-4 rounded backdrop-blur bg-white/50">
          <Form>
            <Input
              type="text"
              name="name"
              id="name"
              ref={nameRef}
              title="name: "
              autoComplete="name-new"
              className="px-10 py-2 mt-2 rounded sm:ml-10"
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type="text"
              name="email"
              id="email"
              ref={emailRef}
              title="email: "
              autoComplete="email-new"
              className="px-10 py-2 mt-2 rounded sm:ml-10"
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              type="text"
              name="password"
              id="password"
              ref={passwordRef}
              title="password: "
              autoComplete="password"
              className="px-10 py-2 mt-2 rounded sm:ml-2"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form>
          <button
            className='mx-auto mb-2 mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-0 px-4 border border-gray-400 rounded shadow'
            onClick={handleSubmit}>Submit</button>

          <h4> Your inputs:</h4>
          <div>
            Name: {name}<br />
            Email: {email} <br />
            Password: {password} <br />
          </div>
          <span>{message}</span>
        </div>
      </div >
    </>
  )
}

export default AddUser