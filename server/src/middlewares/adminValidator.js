import { compare } from 'bcryptjs'
import db from '../../db.js'
////////////////////////////////////////////
export default async (req, res, next) => {
  try {
    const url = `${__dirname}/../../../db/admins.json`

    const admins = JSON.parse(await readFile(url, 'utf-8'))

    const adminExisted = admins.filter(
      (admin) =>
        (req.url === '/register' && admin.username === req.body.username) ||
        admin.email === req.body.email
    )

    if (adminExisted.length) {
      if (req.url === '/register') {
        return res
          .status(400)
          .send({ errors: ['username or email already exists'] })
      }

      const isValidPwd = await compare(
        req.body.password,
        adminExisted[0].password
      )

      if (!isValidPwd) {
        return res.sendStatus(401)
      }
    }
    next()
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}