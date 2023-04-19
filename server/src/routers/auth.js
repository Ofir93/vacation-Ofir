import { Router } from 'express'
import { validationResult } from 'express-validator'
import passwordValidator from '../middlewares/passwordValidator.js'
import passwordEncryptor from '../middlewares/passwordEncryptor.js'
import adminValidator from '../middlewares/adminValidator.js'
import jwtSign from '../middlewares/jwtSign.js'
import matchedData from '../middlewares/matchedData.js'
import {
  registerValidator,
  loginValidator,
} from '../middlewares/formValidator.js'
import { save } from '../controllers/users.js'

const router = Router()

router.post(
  '/register',
  [
    matchedData,
    ...registerValidator,
    passwordValidator,
    passwordEncryptor,
    adminValidator,
    jwtSign,
  ],
  async (req, res) => {
    // console.log(req.data);
    try {
      if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        return res.status(400).send({ errors })
      }
      req.body.password = res.locals.password
      const insertId = await save(req.body)
      insertId
        ? res.json({ accessToken: res.locals.accessToken })
        : res.send(`Nothing inserted User name already exists`)
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)

router.post(
  '/login',
  [matchedData, ...loginValidator, adminValidator, jwtSign],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        return res.status(400).send({ errors })
      }
      res.send({ accessToken: res.locals.accessToken })
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)

export default router
