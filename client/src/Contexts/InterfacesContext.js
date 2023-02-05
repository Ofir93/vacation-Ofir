import React, { useContext, useState } from 'react'

const InterfaceContext = React.createContext()
const InterfaceUpdateContext = React.createContext()

export function useHome() {
    return useContext(InterfaceContext)
}

export function useHomeUpdate() {
    return useContext(InterfaceUpdateContext)
}



export function InterfacesContext({ children }) {
  // const [logIn, setLogIn] = useState(false)
  const [interfaces, setInterface] = useState({
    home: true,
    logIn: false,
    vacations: false,
  })
  // const [vacations, setVacations] = useState(false)

  const toggleInterface = (home, logIn, vacations) => {
    setInterface({
        home: home,
        logIn: logIn,
        vacations: vacations,
      })
}
//   const showHome = () => {
//     setLogIn(false)
//     setHome(true)
//     setVacations(false)
//   }

//   const showVacations = () => {
//     setLogIn(false)
//     setHome(false)
//     setVacations(true)
//   }

  return (
    <InterfaceContext.Provider value={interfaces}>
      <InterfaceUpdateContext.Provider value={toggleInterface}>
        {children}
      </InterfaceUpdateContext.Provider>
    </InterfaceContext.Provider>
  )
}

// export default InterfacesContext
