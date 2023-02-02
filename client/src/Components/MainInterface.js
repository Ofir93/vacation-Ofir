import React, { useState } from 'react'
import Greeting from './Greeting'
import Login from './Login'
import Navbar from './Navbar'
import VacationCards from './VacationCards'
// import home from './VacationCards'

function MainInterface() {
  // const [logIn, setLogIn] = useState(false)
  // const [home, setHome] = useState(true)

  // const showLogin = (logIn) => {
  //   setLogIn(login)
  //   setHome(false)
  // }
  // const showHome = (home) => {
  //   setLogIn(false)
  //   setHome(home)

  // }
  let login = <div></div>

  if(logIn){
    login = <Login></Login>
  }
  return (
    <div id="mainC">
      <Navbar showLogin={showLogin} showHome={showHome}></Navbar>
      {login}
      {/* {home ? <VacationCards></VacationCards> : <div></div>} */}
      {home ? <Greeting showLogin={showLogin}></Greeting> : <div></div>}
    </div>
  )
}

export default MainInterface
