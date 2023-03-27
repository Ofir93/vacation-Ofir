import React from 'react'
import MainInterface from './Components/MainInterface'
import { InterfacesContext } from './Contexts/InterfacesContext'
import { UsersContext } from './Contexts/userProvider'

function App() {
  return (
    <main>
      <UsersContext>
        <InterfacesContext>
          <MainInterface />
        </InterfacesContext>
      </UsersContext>
    </main>
  )
}

export default App
