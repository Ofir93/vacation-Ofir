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
  const [interfaces, setInterface] = useState({
    home: true,
    logIn: false,
    vacations: false,
    adminAddVac:false,
    adminReports: false
  })

  const toggleInterface = (home, logIn, vacations, adminAddVac, adminReports) => {
    setInterface({
        home: home,
        logIn: logIn,
        vacations: vacations,
        adminAddVac: adminAddVac,
        adminReports: adminReports
      })
}

  return (
    <InterfaceContext.Provider value={interfaces}>
      <InterfaceUpdateContext.Provider value={toggleInterface}>
        {children}
      </InterfaceUpdateContext.Provider>
    </InterfaceContext.Provider>
  )
}

