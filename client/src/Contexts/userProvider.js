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
  })

  const updateUser = (userName, role, jwt) => {
    setUser({
        userName: userName,
        role: role,
        jwt: jwt,
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

