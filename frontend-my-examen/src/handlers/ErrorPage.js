import { useNavigate, useRouteError } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate()
  const [msg, setmsg] = useState("")


  axios.post("/v1/logout")
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        // console.log(error);
        setmsg(error.message)
      } else {
        setmsg("")
        // console.log(error);
      }

    })
  function button() {

    navigate('/', { replace: true });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="mt-3">Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <em>{msg || error.statusText} </em>
          </p>
        </div>
        <button onClick={button}>Back to startpage</button>
      </div>
    </div>
  )
}