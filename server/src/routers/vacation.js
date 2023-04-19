import { Router } from 'express'
import { save, find, deleteById, update } from '../controllers/vacations.js'

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

router.get('/', async (req, res) => {
  try {
    const vacation = await find()
    vacation.length ? res.send(vacation) : res.sendStatus(404)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const isUpdated = await update(req.params.id, req.body)
    isUpdated
      ? res.send(`Vacation ${req.params.id} updated!`)
      : res.send('Nothing updated')
  } catch (error) {
    console.log(error)
    res.status(500).send('Nothing updated')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const isDeleted = await deleteById(req.params.id)
    isDeleted
      ? res.send(`Vacation ${req.params.id} deleted!`)
      : res.send('Nothing deleted')
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

export default router
