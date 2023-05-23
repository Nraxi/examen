import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import './handlers/Axios'

function App() {

  const [jwtToken, setJwtToken] = useState("")



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

        <Outlet context={{ jwtToken, setJwtToken }} />
      </div>
    </div >
  )
}

export default App