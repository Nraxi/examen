import React, { useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import Input from '../handlers/Input'
import axios from 'axios'





function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setJwtToken } = useOutletContext();
  const { setAlertMessage } = useOutletContext("");
  const { setAlertClassName } = useOutletContext();
  const [jwts, setjwts] = useState("")

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const Body = {
      email: email,
      password: password,
    }

    console.log(Body);

    axios.post("/v1/login", Body)
      .then((res) => {
        setJwtToken(res.data);
        setAlertClassName("")
        setAlertMessage("")
        navigate('/product', { replace: true });
        // console.log("res", res);
      })
      .catch((error) => {
        setAlertMessage(error.response.data.error);
        setEmail("")
        setPassword("")
        setAlertClassName("alert-danger")
      })

  }



  return (
    <>
      <div>
        <h3>Login Page</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="email"
              id="email"
              value={email}

              title="email: "
              autoComplete="email-new"
              className="email"
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              type="text"
              name="password"
              id="password"
              value={password}

              title="password: "
              autoComplete="password"
              className="password"
              onChange={(event) => setPassword(event.target.value)}
            />

            <input
              type="submit"
              className='btn'
              value="Login"
            />
          </form>

        </div>
      </div >
    </>
  )
}

export default Login