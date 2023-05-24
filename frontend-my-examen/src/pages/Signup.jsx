import React, { useState, useRef } from 'react'
import { Form } from 'react-router-dom'
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
        setMessage(res.data.status + " " + "(please go to login)")
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      })

  }

  console.log(message);




  return (
    <>
      <div>
        <h3>Create an account:</h3>

        <div>
          <Form>
            <Input
              type="text"
              name="name"
              id="name"
              ref={nameRef}
              title="name: "
              autoComplete="name-new"
              className="name"
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type="text"
              name="email"
              id="email"
              ref={emailRef}
              title="email: "
              autoComplete="email-new"
              className="email"
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              type="text"
              name="password"
              id="password"
              ref={passwordRef}
              title="password: "
              autoComplete="password"
              className="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form>
          <button onClick={handleSubmit}>Submit</button>

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

export default Signup