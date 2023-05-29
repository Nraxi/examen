import React, { useState } from 'react'
import { useNavigate, useOutletContext, Outlet } from 'react-router-dom'
import Input from '../handlers/Input'
import axios from 'axios'
import Alert from '../handlers/Alert'





function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setJwtToken } = useOutletContext();


  const [alertMessage, setAlertMessage] = useState("")
  const [alertClassName, setAlertClassName] = useState("d-none")


  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const Body = {
      email: email,
      password: password,
    }

    // console.log(Body);

    axios.post("/v1/login", Body)
      .then((res) => {
        setJwtToken(res.data);
        setAlertClassName("")
        setAlertMessage("")
        navigate('/startpage', { replace: true });
        // console.log("res", res);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          navigate('/error', { replace: true })
        } else {
          setAlertMessage(error.response.data.error);
          setEmail("")
          setPassword("")
          setAlertClassName("alert-danger")
        }
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

              title="Username:"
              autoComplete="email-new"
              className="email"
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              type="password"
              name="password"
              id="password"
              value={password}

              title="Password: "
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
          <Alert
            message={alertMessage}
            className={alertClassName}
          />
        </div>
      </div >
      <Outlet context={{ setAlertClassName, setAlertMessage }} />
    </>
  )
}

export default Login