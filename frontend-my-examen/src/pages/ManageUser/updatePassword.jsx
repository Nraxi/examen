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
      <div className="grid md:grid-cols-3">
        <h3 className="mb-10 col-span-3 md:col-start-2 md:col-span-1 text-center mt-10 text-2xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2">
          Update Password:</h3>
        <div className="mb-2 col-span-3 md:col-start-2 md:col-span-1 row-start-2 p-4 rounded backdrop-blur bg-white/50">
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
      </div>
    </div>
  )
}

export default UpdatePassword