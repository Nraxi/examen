import React from 'react'
import AddUser from './ManageUser/addUser'
import UpdateUser from './ManageUser/updateUser'
import StartpageLoggedIn from './StartpageLoggedIn'
import UpdatePassword from './ManageUser/updatePassword'
import GetUsers from './ManageUser/getUsers'
import GetUser from './ManageUser/getUser'

function ManageUsers() {







  return (
    <div>ManageUsers
      <StartpageLoggedIn />
      <hr />
      <div>
        <AddUser />
        <hr />
        <UpdateUser />
        <hr />
        <UpdatePassword />
        <hr />
        <GetUsers />
        <hr />
        <GetUser />
        <hr />
      </div>
    </div>
  )
}

export default ManageUsers