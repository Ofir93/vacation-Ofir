import { Router } from 'express'
import { validationResult } from 'express-validator'
// import { registerValidator, loginValidator } from '../middlewares/formValidator'
// import { readFile, writeFile } from 'fs/promises'
// import { Admin } from '../types'
import passwordValidator from '../middlewares/passwordValidator.js'
import passwordEncryptor from '../middlewares/passwordEncryptor.js'
// import adminValidator from '../middlewares/adminValidator.js'
// import jwtSign from '../middlewares/jwtSign'
import matchedData from '../middlewares/matchedData.js'
import { registerValidator } from '../middlewares/formValidator.js'

const router = Router()

router.post(
  '/register',
  [
    matchedData,
    ...registerValidator,
    passwordValidator,
    passwordEncryptor,
  ],
  async (req, res) => {
    console.log('ok');
  })

// router.post(
//   '/register',
//   [
//     matchedData,
//     ...registerValidator,
//     passwordValidator,
//     passwordEncryptor,
//     jwtSign,
//   ],
//   async (req, res) => {
//     try {
//       if (!validationResult(req).isEmpty()) {
//         const errors = validationResult(req).array()
//         return res.status(400).send({ errors })
//       }
//       const url = `${__dirname}/../../../db/admins.json`

//       const admins = JSON.parse(await readFile(url, 'utf-8'))

//       //get max id in admin db
//       const id = admins.reduce((acc, cur) => {
//         return acc > cur.id ? acc : cur.id
//       }, 0)

//       const admin = {
//         id: id + 1,
//         ...req.body,
//         password: res.locals.password,
//       }

//       admins.push(admin)

//       await writeFile(url, JSON.stringify(admins, null, 2))

//       res.send({ accessToken: res.locals.accessToken })
//     } catch (error) {
//       console.error(error)
//       res.sendStatus(500)
//     }
//   }
// )

// router.post(
//   '/login',
//   [
//     matchedData,
//     ...loginValidator,
//     adminValidator,
//     jwtSign,
//   ],
//   async (req, res) => {
//     try {
//       if (!validationResult(req).isEmpty()) {
//         const errors = validationResult(req).array()
//         return res.status(400).send({ errors })
//       }
//       res.send({ accessToken: res.locals.accessToken })
//     } catch (error) {
//       console.error(error)
//       res.sendStatus(500)
//     }
//   }
// )

export default router