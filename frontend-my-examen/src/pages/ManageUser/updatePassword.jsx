import React from 'react'

function updatePassword() {

  const [email, setEmail] = useState("")
  const [oldpassword, setOldpassword] = useState("")
  const [newpassword, setNewPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")


  const body = {
    "email": email,
    "old_password": oldpassword,
    "new_password": newpassword,
    "confirm_password": confirmpassword
  }

  return (
    <div>updatePassword

    </div>
  )
}

export default updatePassword