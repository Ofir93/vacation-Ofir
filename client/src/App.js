import React from 'react'
import MainInterface from './Components/MainInterface'
import { InterfacesContext } from './Contexts/InterfacesContext.js'


function App() {
  return (
    <main>
      <InterfacesContext>
      <MainInterface/>
      </InterfacesContext>
    </main>
  )
}

export default App