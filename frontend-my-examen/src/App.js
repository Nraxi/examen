import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      My page
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App