import React, { useState, useRef } from 'react'
import { Form } from 'react-router-dom'
import Input from '../handlers/Input'




function Signup(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  return (
    <>
      <div>
        <h3>hej</h3>
        <div>
          <Form>
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

          <h4> User inputs:</h4>
          <div>
            Email: {email} <br />
            Password: {password} <br />
          </div>
        </div>
      </div >
    </>
  )
}

export default Signup