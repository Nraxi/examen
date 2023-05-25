import React from 'react'
import AddUser from './ManageUser/addUser'
import UpdateUser from './ManageUser/updateUser'
import UpdatePassword from './ManageUser/updatePassword'
import GetUsers from './ManageUser/getUsers'
import GetUser from './ManageUser/getUser'
import DelUser from './ManageUser/delUser'
import GetUserInformation from './GetUserInformation'

function ManageUsers() {


  return (
    <div>ManageUsers
      <GetUserInformation />
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
        <DelUser />
      </div>
    </div>
  )
}

export default ManageUsers