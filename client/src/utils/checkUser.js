import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { useHomeUpdate } from '../Contexts/InterfacesContext'
// import { useUserUpdate } from '../Contexts/userProvider'

dotenv.config()

//   const interfacesChange = useHomeUpdate()

//   const userModelChange = useUserUpdate()


   export default () => {
    // const token = Cookies.get('jwt')
    const storageToken = window.localStorage.getItem('jwt')

    if (!storageToken) {
    //   interfacesChange(true, false, false)
      console.log('token not found');
    //   userModelChange('','','')
      return false
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
    //   interfacesChange(true, false, false)
    //   userModelChange('','','')
      window.localStorage.removeItem('jwt')
      alert('Invalid or expired premissions, please relogin');
      return false
    }  
    decoded.storageToken = storageToken
    // userModelChange(decoded.userName, decoded.role, storageToken)
      // setUser(decoded)
    //   interfacesChange(false, false, true)
    // console.log(decoded)
    return decoded 
  }
