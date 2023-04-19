import React, { useContext, useState } from 'react'

const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function useUserUpdate() {
  return useContext(UserUpdateContext)
}

export function UsersContext({ children }) {
  const [user, setUser] = useState({
    userName: '',
    role: '',
    jwt: '',
    id: '',
  })

  const updateUser = (userName, role, jwt, id) => {
    setUser({
      userName: userName,
      role: role,
      jwt: jwt,
      id: id,
    })
  }

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}
