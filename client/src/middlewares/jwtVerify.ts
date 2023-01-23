import { Request, Response, NextFunction } from 'express'
import { readFile } from 'fs/promises'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { Admin, Role } from '../types'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.sendStatus(401)
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.sendStatus(401)
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return res.sendStatus(500)
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          return res
            .status(403)
            .send({ errors: ['You do not have permission'] })
        }
        const { email } = decoded

        const admins: Admin[] = JSON.parse(
          await readFile(`${process.cwd()}/../db/admins.json`, 'utf8')
        )

        const [admin]: Admin[] = admins.filter((admin) => admin.email === email)

        if (!admin) {
          return res
            .status(403)
            .send({ errors: ['You do not have permission'] })
        }

        res.locals.admin = admin

        next()
      }
    )
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
