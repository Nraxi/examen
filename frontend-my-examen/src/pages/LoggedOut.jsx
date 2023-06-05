import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoggedOut() {

  const navigate = useNavigate();

  function BackToLogin(e) {
    e.preventDefault()
    navigate("/login")
  }

  return (
    <div className="text-center mt-20">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <p>
            <em className="mt-3 text-2xl">You have successfully logged out</em>
          </p>
          <br />
          <button
            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
            onClick={BackToLogin}>To login Page</button>
        </div>
        <p className="mt-3 text-l">Click here to login agian..</p>
      </div>
    </div>
  )
}

export default LoggedOut