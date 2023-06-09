import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './handlers/Axios'
import axios from 'axios'
import Footer from './components/Footer'

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
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-rose-300 via-fuchsia-300 to-gray-50">
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 sm:flex sm:justify-between sm:items-center">
          <Link to="/">
            <h1 className="text-2xl font-semibold text-center sm:text-left sm:mr-4 dark:text-white">Vibe and freinds, Examen</h1>
          </Link>
          <div className="w-full sm:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col items-center font-medium mt-4 rounded-lg bg-gray-50 sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0 sm:bg-transparent dark:bg-gray-800 sm:dark:bg-transparent dark:border-gray-700">
              {jwtToken === "" &&
                <>
                  <Link className="block py-2 pl-10 pr-10 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >Home</Link>
                  <Link className="block py-2 pl-10 pr-10 ml-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    to="/signup"><span>Signup</span></Link>
                </>
              }
              {jwtToken !== "" &&
                <>
                  <Link className="block py-2 pl-10 pr-10 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    to="/startpage">Startpage</Link>
                  <Link className="block py-2 pl-10 pr-10 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    to="/manageusers">Manage Users</Link>
                  <Link className="block py-2 pl-10 pr-10 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    to="/product">Get from outside api</Link>
                  <Link className="block py-2 pl-10 pr-10 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    to="/tryme">Json Blob</Link>
                </>
              }
              {jwtToken === "" ? (
                <Link className="block py-2 pl-10 pr-10 ml-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/login">
                  <span>Login</span>
                </Link>
              ) : (
                <Link className="block py-2 pl-10 pr-10  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="#" onClick={LogOut}>
                  <span>Logout</span>
                </Link>
              )}
              <br />
            </ul>

          </div>
        </div>
      </nav >
      <div className="flex-grow">
        <Outlet context={{ jwtToken, setJwtToken }} />
      </div>
      <Footer />
    </div >
  )
}

export default App