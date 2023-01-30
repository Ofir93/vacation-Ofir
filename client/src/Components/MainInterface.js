import React, { useState } from 'react'
import Login from './Login'
import Navbar from './Navbar'
// import home from './VacationCards'

function MainInterface() {
  const [logIn, setLogIn] = useState(false)
  const [home, setHome] = useState(false)

  const showLogin = (logIn) => {
    setLogIn(login)
    setHome(false)
  }
  const showHome = (home) => {
    setLogIn(false)
    setHome(home)

  }
  let login = <div></div>

  // const login = <Login></Login>
  if(logIn){
    login = <Login></Login>
  }
  return (
    <div id="mainC">
      <Navbar showLogin={showLogin} showHome={showHome}></Navbar>
      {login}
      {}
    </div>
  )
}

export default MainInterface
