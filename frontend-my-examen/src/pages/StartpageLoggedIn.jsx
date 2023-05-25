import React from 'react'
import GetUserInformation from './GetUserInformation'
import InitialUpgf from './InitialUpgf'

function StartpageLoggedIn() {
  return (
    <div>
      <GetUserInformation />
      <InitialUpgf />
    </div>
  )
}

export default StartpageLoggedIn