import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Alert from './handlers/Alert'

function App() {

  const [jwtToken, setJwtToken] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [alertClassName, setAlertClassName] = useState("d-none")


  const navigate = useNavigate();

  const LogOut = () => {
    setJwtToken("");
    navigate("/login")
  }


  return (
    <div>
      My page
      <nav>
        <div>
          {jwtToken === ""
            ? <Link to="/login"><span>Login</span></Link>
            : <Link to="#" onClick={LogOut}><span>Logout</span></Link>
          }<br />

          {jwtToken === "" &&
            <>
              <Link to="/signup"><span>Signup</span></Link><br />
            </>
          }

          <Link to="/">Home</Link><br />
          {jwtToken !== "" &&
            <>
              <Link to="/product">Products</Link><br />
            </>
          }
        </div>
      </nav >
      <div>
        <Alert
          message={alertMessage}
          className={alertClassName}
        />
        <Outlet context={{ jwtToken, setJwtToken, setAlertMessage, setAlertClassName }} />
      </div>
    </div >
  )
}

export default App