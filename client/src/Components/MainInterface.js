import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Greeting from './Greeting'
import Login from './Login'
import Navbar from './Navbar'
import VacationCards from './VacationCards'
// import home from './VacationCards'
import { InterfacesContext } from '../App.js'
import { useHome, useHomeUpdate } from '../Contexts/InterfacesContext'

dotenv.config()

function MainInterface() {
  const [userName, setUserName] = useState({})
  // const [home, setHome] = useState(true)

  // const showLogin = (logIn) => {
  //   setLogIn(login)
  //   setHome(false)
  // }
  // const showHome = (home) => {
  //   setLogIn(false)
  //   setHome(home)

  // }

  const cheackUser = () => {
    const token = Cookies.get('jwt')
    console.log(token)
    console.log(process.env.REACT_APP_ACCESS_TOKEN_SECRET)

    if (!token) {
      return console.log('no')
    }
    const decoded = jwt.verify(
      token,
      process.env.REACT_APP_ACCESS_TOKEN_SECRET, 
      (err, verifiedJwt) => {
        if (err) {
          return err
        } else {
          return verifiedJwt
        }
      }
    )
    console.log(userName)
    console.log(decoded)
  }

  const interfaces = useHome()
  const interfacesChange = useHomeUpdate(false, true, false)
  // const vacations = useHomeUpdate(false, false, true)
  let page = false

  if (interfaces.logIn) {
    page = <Login setUserName={setUserName}></Login>
  }
  if (interfaces.vacations) {
    page = <VacationCards></VacationCards>
  }

  useEffect(() => {
    cheackUser()
  }, [0])
  return (
    <div id="mainC">
      <Navbar interfacesChange={interfacesChange} userName={userName}></Navbar>
      {/* {login} */}
      {/* {home ? <VacationCards></VacationCards> : <div></div>} */}
      {page ? page : <Greeting interfacesChange={interfacesChange}></Greeting>}
    </div>
    // <div id="mainC">
    //   <Navbar showLogin={showLogin} showHome={showHome}></Navbar>
    //   {login}
    //   {/* {home ? <VacationCards></VacationCards> : <div></div>} */}
    //   {home ? <Greeting showLogin={showLogin}></Greeting> : <div></div>}
    // </div>
  )
}

export default MainInterface
