import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoggedOut() {

  const navigate = useNavigate();

  function BackToLogin(e) {
    e.preventDefault()
    navigate("/login")
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <p>
            <em className="mt-3">You have successfully logged out</em>
          </p>
          <p>Click here to login agian:</p>
          <button onClick={BackToLogin}>Login Page</button>
        </div>
      </div>
    </div>
  )
}

export default LoggedOut