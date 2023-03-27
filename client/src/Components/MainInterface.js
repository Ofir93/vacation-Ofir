import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Greeting from './Greeting'
import Login from './Login'
import Navbar from './Navbar'
import VacationCards from './VacationCards'
import { useHome, useHomeUpdate } from '../Contexts/InterfacesContext'
import { useUser, useUserUpdate } from '../Contexts/userProvider'
import AddVacation from './AddVacation'
import Reports from './Reports'

dotenv.config()

function MainInterface() {
  // const [user, setUser] = useState({})

  const interfaces = useHome()
  const interfacesChange = useHomeUpdate()

  const userModel = useUser()
  const userModelChange = useUserUpdate()

  let page = false

  const checkUser = () => {
    // const token = Cookies.get('jwt')
    const storageToken = window.localStorage.getItem('jwt')

    if (!storageToken) {
      page = false
      interfacesChange(true, false, false)
      console.log('token not found');
      userModelChange('','','')
      return
    }

    const decoded = jwt.verify(
      storageToken,
      process.env.REACT_APP_ACCESS_TOKEN_SECRET, 
      (err, verifiedJwt) => {
        if (err) {
          console.log(err.message)


          //relogin? error?
          return err.message
        } else {
          return verifiedJwt
        }
      }
    )
    if(decoded === 'invalid token' || decoded === 'jwt expired'){
      page = false
      interfacesChange(true, false, false)
      userModelChange('','','')
      window.localStorage.removeItem('jwt')
      alert('Invalid or expired premissions, please relogin');
      return
    }  

    userModelChange(decoded.userName, decoded.role, storageToken)
      // setUser(decoded)
      interfacesChange(false, false, true)
    // console.log(decoded)
  }





  if (interfaces.logIn) {
    page = <Login></Login>
  }
  if (interfaces.vacations) {
    page = <VacationCards></VacationCards>
  }
  if (interfaces.adminAddVac) {
    page = <AddVacation></AddVacation>
  }
  if (interfaces.adminReports) {
    page = <Reports></Reports>
  }
  

  useEffect(() => {
    checkUser()
  }, [0])
  return (
    <div id="mainC">
      <Navbar interfacesChange={interfacesChange}></Navbar>
      {page ? page : <Greeting interfacesChange={interfacesChange}></Greeting>}
    </div>
   
  )
}

export default MainInterface
