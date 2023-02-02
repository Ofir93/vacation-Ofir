import React, {useContext, useState} from 'react'

const InterfaceContext = React.createContext()
const InterfaceUpdateContext = React.createContext()

function InterfacesContext() {

    const [logIn, setLogIn] = useState(false)
    const [home, setHome] = useState(true)
  
    const showLogin = (logIn) => {
      setLogIn(login)
      setHome(false)
    }
    const showHome = (home) => {
      setLogIn(false)
      setHome(home)
  
    }
  
  return (
    <div>InterfacesContext</div>
  )
}

export default InterfacesContext