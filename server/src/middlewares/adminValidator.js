import bcrypt from 'bcryptjs'
import db from '../db.js'

export default async (req, res, next) => {
  try {
    const admins = await db.execute(`select * from admins`)
    const users = await db.execute(`select * from users`)

    const adminExisted = admins[0].filter(
      (admin) => req.url === '/login' && admin.user_name === req.body.userName
    )

    const userExisted = users[0].filter(
      (user) => req.url === '/login' && user.user_name === req.body.userName
    )

    if (adminExisted.length) {
      const isValidPwd = await bcrypt.compare(
        req.body.password,
        adminExisted[0].password
      )
      if (!isValidPwd) {
        return res.sendStatus(401)
      }
      req.body.role = 'admin'
    }

    if (userExisted.length) {
      const isValidPwd = await bcrypt.compare(
        req.body.password,
        userExisted[0].password
      )
      req.body.id = userExisted[0].id
      req.body.role = 'user'
      if (!isValidPwd) {
        return res.sendStatus(401)
      }
    }

    if (!userExisted.length && !adminExisted.length && req.url === '/register') {
      req.body.role = 'user'
      req.body.id = ++users[0].length  
    }

    if (!userExisted.length && !adminExisted.length && req.url === '/login') {
      return res.status(400).send({ errors: ['username not registered please try again or register'] })
    }
    next()
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
