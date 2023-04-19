import { Router } from 'express'
import {
  save,
  find,
  deleteById,
  updateFollow,
  removeFollow,
} from '../controllers/follows.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const insert = await save(req.body)
    await updateFollow()
    res.send(insert)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

router.get('/:userId&:vacId', async (req, res) => {
  try {
    const follow = await find(req.params.userId, req.params.vacId)
    follow.length ? res.send(follow) : res.send('404')
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

router.post('/delFol', async (req, res) => {
  try {
    const isDeleted = await deleteById(req.body.userId, req.body.vacId)
    if (isDeleted) {
      await removeFollow(req.body.vacId)
      res.send(`Vacation ${req.body.vacId} deleted!`)
      return
    }
    res.send('Nothing deleted')
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

export default router
