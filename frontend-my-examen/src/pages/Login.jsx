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
      <div className="grid md:grid-cols-3">
        <h3 className="mb-10 col-span-3 md:col-start-2 md:col-span-1 text-center mt-10 text-6xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">Login Page</h3>
        <div className="mb-2 col-span-3 md:col-start-2 md:col-span-1 row-start-2 p-4 rounded backdrop-blur bg-white/50">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="email"
              id="email"
              value={email}

              title="Username:"
              autoComplete="email-new"
              className="px-10 py-2 mt-2 rounded "
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              type="password"
              name="password"
              id="password"
              value={password}

              title="Password: "
              autoComplete="password"
              className="px-10 py-2 mt-2 rounded"
              onChange={(event) => setPassword(event.target.value)}
            />

            <input
              type="submit"
              className="btn mt-10 mx-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 border border-green-700 rounded "
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