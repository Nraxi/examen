import React, { useState, useRef } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import Input from '../handlers/Input'
import axios from 'axios'




function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

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

    // console.log(Body);
    axios.post("/v1/signup", Body)
      .then((res) => {
        setMessage(`${res.data.status} (please go to login)`)
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          navigate('/error', { replace: true })
        } else {
          setMessage(error.response.data.error);
        }
      })
  }

  // console.log(message);




  return (

    <div className="grid md:grid-cols-3">
      <h1 className="col-span-3 md:col-start-2 md:col-span-1 text-center mt-10 text-6xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">Create your account:</h1>


      <div className="mb-2 col-span-3 md:col-start-2 md:col-span-1 row-start-2 p-4 rounded backdrop-blur bg-white/50">
        <Form >
          <Input
            type="text"
            name="name"
            id="name"
            ref={nameRef}
            title="Name: "
            autoComplete="name-new"
            className="p-2 sm:px-10 mt-2 ml-8 rounded md:ml-0  lg:ml-10 "
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            type="text"
            name="email"
            id="email"
            ref={emailRef}
            title="Email: "
            autoComplete="email-new"
            className="p-2 sm:px-10 mt-2 ml-9 rounded md:ml-0  lg:ml-11"
            onChange={(event) => setEmail(event.target.value)}
          />

          <Input
            type="text"
            name="password"
            id="password"
            ref={passwordRef}
            title="Password: "
            autoComplete="password"
            className="p-2 sm:px-10 mt-2 ml-1 rounded lg:ml-3"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form>
        <div className='mt-10'>
          <h4> Your inputs:</h4>
          Name: {name}<br />
          Email: {email} <br />
          Password: {password} <br />
        </div>
        <br />
        <span className='mx-auto'>{message}</span><br />




        <button
          className="mx-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 border border-green-700 rounded "
          onClick={handleSubmit}>Submit</button>
      </div>
    </div >

  )
}

export default Signup