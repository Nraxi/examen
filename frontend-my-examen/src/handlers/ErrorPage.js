import { useNavigate, useRouteError } from "react-router-dom";
import axios from "axios";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate()

  axios.post("/v1/logout")

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
            <em>{error.statusText || error.message}</em>
          </p>
        </div>
        <button onClick={button}>Back to startpage</button>
      </div>
    </div>
  )
}