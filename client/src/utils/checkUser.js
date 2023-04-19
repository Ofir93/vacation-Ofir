import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default () => {
  const storageToken = window.localStorage.getItem('jwt')

  if (!storageToken) {
    console.log('token not found')
    return false
  }


  const decoded = jwt.verify(
    storageToken,
    process.env.REACT_APP_ACCESS_TOKEN_SECRET,
    (err, verifiedJwt) => {
      if (err) {
        console.log(err.message)

        return err.message
      } else {
        return verifiedJwt
      }
    }
  )
  if (decoded === 'invalid token' || decoded === 'jwt expired') {
    window.localStorage.removeItem('jwt')
    alert('Invalid or expired premissions, please relogin')
    return false
  }
  decoded.storageToken = storageToken
  return decoded
}
