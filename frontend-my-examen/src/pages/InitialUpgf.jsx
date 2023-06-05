import React from 'react'

function InitialUpgf() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className='text-center  text-2xl font-bold bg-gradient-to-l from-teal-200 to-slate-100 bg-clip-text text-transparent pr-2'>Background about this page</h2>
      <div className='text-white'>

        <br />Initial inlämningsuppgift<br /> Namn: Olle Tengnér
        <br />
        <br /> Backend: Golang <br />Frontend: React <br />DB: Postgress <br />Roller: main roll
        <br />Typ av applikation/hemsida:
        <br /> Applikationen eller hemsidan i detta fall kommer att bestå av en inloggning med protective routes.
        <br />I inloggat läge kommer man att få tillgång till att kunna hämta ett api som är en json fil. Samt kunna lägga till & ta bort befintliga användare.
      </div>
    </div>
  )
}

export default InitialUpgf