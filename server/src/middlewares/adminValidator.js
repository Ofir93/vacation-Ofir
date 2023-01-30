import bcrypt from 'bcryptjs'
import db from '../db.js'
////////////////////////////////////////////
export default async (req, res, next) => {
  try {

    const admins = await db.execute(`select * from admins`)
    const users = await db.execute(`select * from users`)

    const adminExisted = admins[0].filter(
      (admin) =>
        (req.url === '/login' && admin.user_name === req.body.userName) 
    )
    // console.log(adminExisted);

    const userExisted = users[0].filter(
      (user) =>
        (req.url === '/login' && user.user_name === req.body.userName) 
    )
    // console.log(userExisted);

    if (adminExisted.length) {

      // if (req.url === '/login') {
        // return res
        //   .status(400)
        //   .send({ errors: ['username or email already exists'] })
      // }
      // console.log(adminExisted[0].password);

      const isValidPwd = await bcrypt.compare(
        req.body.password,
        adminExisted[0].password
      )
      if (!isValidPwd) {
        return res.sendStatus(401)
      }
      // else{console.log('ps ok');}
      req.body.role = "admin"
    }

    if(userExisted.length){
      // console.log(userExisted[0].password);

      const isValidPwd = await bcrypt.compare(
        req.body.password,
        userExisted[0].password
      )
      if (!isValidPwd) {
        return res.sendStatus(401)
      }
      // else{console.log('ps ok');}
      req.body.role = "user"
    }
if(!userExisted.length && !adminExisted.length){
  // console.log(userExisted, adminExisted);
    return res
    .status(400)
    .send({ errors: ['username not registered'] })
}
    next()

    
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

//$10$raCK3odw4QpXdvwMvCaW8.nYCXL04M5FMDuNXjn4qd9tEeae02Lbe