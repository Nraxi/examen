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
    <div>
      <h1 className="text-center text-6xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2 mt-10">Manage Users</h1>
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