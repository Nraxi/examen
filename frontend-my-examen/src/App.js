import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './handlers/Axios'
import axios from 'axios'

function App() {

  const [jwtToken, setJwtToken] = useState("")



  const navigate = useNavigate();

  const LogOut = () => {
    setJwtToken("");
    axios.post("/v1/logout")
    navigate("/login")
  }
  useEffect(() => {
    if (window.location.href === "http://localhost:3000/") {
      LogOut();
    }
  }, []);

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
              <Link to="/">Home</Link><br />
              <Link to="/signup"><span>Signup</span></Link><br />
            </>
          }


          {jwtToken !== "" &&
            <>
              <Link to="/">Home</Link><br />
              <Link to="/product">Products</Link><br />
            </>
          }
        </div>
      </nav >
      <div>

        <Outlet context={{ jwtToken, setJwtToken }} />
      </div>
    </div >
  )
}

export default App