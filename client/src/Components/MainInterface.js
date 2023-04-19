import React, { useEffect } from 'react'
import Greeting from './Greeting'
import Login from './Login'
import Navbar from './Navbar'
import VacationCards from './VacationCards'
import { useHome, useHomeUpdate } from '../Contexts/InterfacesContext'
import { useUserUpdate } from '../Contexts/userProvider'
import AddVacation from './AddVacation'
import Reports from './Reports'
import checkUserUtil from '../utils/checkUser.js'

function MainInterface() {
  const interfaces = useHome()
  const interfacesChange = useHomeUpdate()

  const userModelChange = useUserUpdate()

  let page = false

  const checkUser = () => {
    const verifyUser = checkUserUtil()
    if (!verifyUser) {
      interfacesChange(true, false, false)
      userModelChange('', '', '')
      return
    }
    if (verifyUser === 'invalid token' || verifyUser === 'jwt expired') {
      interfacesChange(true, false, false)
      userModelChange('', '', '')
    }
    interfacesChange(false, false, true)
    userModelChange(
      verifyUser.userName,
      verifyUser.role,
      verifyUser.storageToken,
      verifyUser.id
    )
    return
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
    page = (
      <div className="reports container-fluid">
        <Reports></Reports>
      </div>
    )
  }

  useEffect(() => {
    checkUser()
  }, [0])
  return (
    <div id="mainC">
      <Navbar></Navbar>
      {page ? page : <Greeting interfacesChange={interfacesChange}></Greeting>}
    </div>
  )
}

export default MainInterface
