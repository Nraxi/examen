import React, { useState, useEffect } from 'react'
import axios from 'axios';

function StartpageLoggedIn() {

  const [getUserInfo, setGetUserInfo] = useState("")



  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get("/admin/user-validate-res")
      .then((res) => setGetUserInfo(res.data.data))
      .catch((error) => {
        console.log("Small issues", error.response.statusText);
      })
  }







  return (
    <div>StartpageLoggedIn
      <p>Welcome! {getUserInfo.Name}</p>


    </div>
  )
}

export default StartpageLoggedIn