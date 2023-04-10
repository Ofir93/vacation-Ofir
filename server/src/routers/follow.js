import {Router} from 'express'
import { save, find, deleteById, updateFollow, removeFollow } from '../controllers/follows.js'

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
    // console.log(req.params.userId, req.params.vacId);
    const follow = await find(req.params.userId, req.params.vacId)
    // console.log(follow);
    follow.length ? res.send(follow) : res.send("404")
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


router.post('/delFol', async (req, res) => {
    try {
    //   const insert = await save(req.body)
    //   await updateFollow()
    //   res.send(insert)
    // const [userId, vacId] = req.body
    // console.log(req.body.userId, req.body.vacId);
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
  

// router.delete('/:deleteFollow', async (req, res) => {
//     try {
//         const [userId] = req.params.deleteFollow
//         console.log(userId);
//       const isDeleted = await deleteById(req.params.deleteFollow.userId, req.params.deleteFollow.vacId)
//       if (isDeleted) {
//         await updateFollow()
//         res.send(`Vacation ${req.params.id} deleted!`)
//         return
//       }
//       res.send('Nothing deleted')
//       } catch (error) {
//       console.log(error)
//       res.status(500)
//     }
//   })

  
export default router