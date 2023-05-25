import React from 'react'
import AddUser from './ManageUser/addUser'
import UpdateUser from './ManageUser/updateUser'
import StartpageLoggedIn from './StartpageLoggedIn'

function ManageUsers() {







  return (
    <div>ManageUsers
      <StartpageLoggedIn />
      <div>
        <AddUser />
        <UpdateUser />
        <p>Update password</p>
        <p>Delete user</p>
        <p>Get users</p>
      </div>
    </div>
  )
}

export default ManageUsers