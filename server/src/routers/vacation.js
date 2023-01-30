import {Router} from 'express'
import { save, find, update, deleteById } from '../controllers/vacations.js'

const router = Router()

// router.post('/', async (req, res) => {
//   try {
//     const insertId = await save(req.body)
//     insertId
//       ? res.send(`User ${insertId} inserted!`)
//       : res.send('Nothing inserted')
//   } catch (error) {
//     console.log(error)
//     res.status(500)
//   }
// })

// router.get('/:id', async (req, res) => {
//   try {
//     const user = await find(req.params.id)
//     user.length ? res.send(user) : res.sendStatus(404)
//   } catch (error) {
//     console.log(error)
//     res.status(500)
//   }
// })

router.get('/', async (req, res) => {
  try {
    const user = await find()
    user.length ? res.send(user) : res.sendStatus(404)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// router.patch('/:id', async (req, res) => {
//   try {
//     const isUpdated = await update(req.params.id, req.body)
//     isUpdated
//       ? res.send(`User ${req.params.id} updated!`)
//       : res.send('Nothing updated')
//   } catch (error) {
//     console.log(error)
//     res.status(500)
//   }
// })


// router.delete('/:id', async (req, res) => {
//     try {
//       const isDeleted = await deleteById(req.params.id)
//       isDeleted
//         ? res.send(`User ${req.params.id} deleted!`)
//         : res.send('Nothing deleted')
//     } catch (error) {
//       console.log(error)
//       res.status(500)
//     }
//   })
export default router