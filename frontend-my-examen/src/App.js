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
    navigate("/logout")
  }


  useEffect(() => {
    if (window.location.pathname === "/" ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/signup"
    ) {
      axios.post("/v1/logout")
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            navigate('/', { replace: true })
          } else {
            // Do nothing
            // console.log("ok");
          }
        })
    }
  }, [navigate]);



  return (
    <div className="h-screen bg-blue-400">
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className="self-center text-2xl font-semibold whitespace-nowrap">My page</h1>
          <div className=" w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0  sm:bg-transparent dark:bg-gray-800  sm:dark:bg-transparent dark:border-gray-700">
              {jwtToken === "" &&
                <>
                  <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/">Home</Link>
                  <Link className='className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"' to="/signup"><span>Signup</span></Link>
                </>
              }
              {jwtToken !== "" &&
                <>
                  <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/startpage">Startpage</Link>
                  <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/manageusers">Manage Users</Link>
                  <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/product">Get from outside api</Link>
                  <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/tryme">Json Blob</Link>
                </>
              }
              {jwtToken === ""
                ? <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/login"><span>Login</span></Link>
                : <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="#" onClick={LogOut}><span>Logout</span></Link>
              }<br />
            </ul>
          </div>
        </div>
      </nav >
      <div >
        <Outlet context={{ jwtToken, setJwtToken }} />
      </div>
    </div >
  )
}

export default App