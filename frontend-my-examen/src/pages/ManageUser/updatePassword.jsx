import React from 'react'
import { useState, useEffect } from 'react'
import Input from '../../handlers/Input'
import axios from 'axios'

function UpdatePassword() {

  const [email, setEmail] = useState("")
  const [oldpassword, setOldpassword] = useState("")
  const [newpassword, setNewPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [msgErr, setMsgErr] = useState("")

  const [data, setData] = useState("");
  const url = "/admin/user-validate-res";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const responseData = res.data;
        setData(responseData.data);
      })
      .catch((err) => console.error(err));
  }, []);


  function handleSubmit() {
    const body = {
      "email": email,
      "old_password": oldpassword,
      "new_password": newpassword,
      "confirm_password": confirmpassword
    }


    axios
      .put("admin/updatepassword/" + data.ID, body)
      .then((res) => {
        const responseData = res.data.replace(/}{/g, '},{');
        const jsonArray = `[${responseData}]`;
        const jsonData = JSON.parse(jsonArray);
        const data = jsonData[1];
        const err = data.error
        setMsg(data.message);
        setMsgErr(err)
      })

  }


  return (
    <div>
      <h2>Update Password:</h2>
      <p>{msg}</p>
      <p>{msgErr}</p>
      <form>
        <Input
          type="text"
          name="email"
          id="email"
          value={email}
          title="Your email: "
          autoComplete="email-new"
          className="email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          type="text"
          name="oldpassword"
          id="oldpassword"
          value={oldpassword}
          title="Your old password: "
          autoComplete="oldpassword-new"
          className="oldpassword"
          onChange={(event) => setOldpassword(event.target.value)}
        />

        <Input
          type="text"
          name="newpassword"
          id="newpassword"
          value={newpassword}
          title="Your new password: "
          autoComplete="newpassword-new"
          className="newpassword"
          onChange={(event) => setNewPassword(event.target.value)}
        />

        <Input
          type="text"
          name="confirmpassword"
          id="confirmpassword"
          value={confirmpassword}
          title="Confirm password: "
          autoComplete="confirmpassword-new"
          className="confirmpassword"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </form>
      <button onClick={handleSubmit}>Submit</button>

    </div>
  )
}

export default UpdatePassword