import {Router} from 'express'
import { save, find, deleteById } from '../controllers/follows.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const insert = await save(req.body)
    res.send(insert)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// router.get('/:id', async (req, res) => {
//   try {
//     const user = await find(req.params.id)
//     user.length ? res.send(user) : res.sendStatus(404)
//   } catch (error) {
//     console.log(error)
//     res.status(500)
//   }
// })

router.get('/:userId&:vacId', async (req, res) => {
  try {
    console.log(req.params.userId, req.params.vacId);
    const follow = await find(req.params.userId, req.params.vacId)
    follow.length ? res.send(follow) : res.sendStatus(404)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// router.patch('/:id', async (req, res) => {
//   try {
//     const isUpdated = await update(req.params.id, req.body)
//     isUpdated
//       ? res.send(`Vacation ${req.params.id} updated!`)
//       : res.send('Nothing updated')
//   } catch (error) {
//     console.log(error)
//     res.status(500).send('Nothing updated')
//   }
// })


router.delete('/:id&vac', async (req, res) => {
    try {
      const isDeleted = await deleteById(req.params.id, req.params.vac)
      isDeleted
        ? res.send(`Vacation ${req.params.id} deleted!`)
        : res.send('Nothing deleted')
    } catch (error) {
      console.log(error)
      res.status(500)
    }
  })

  
export default router