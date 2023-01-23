import bcrypt from 'bcryptjs'

export default async (req, res, next) => {
  try {
    bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
        console.log(hash)

    //   storeNewUser(firstName, lastName, userName, hash)
    //   return res.status(200).send('registration comlplited')
    })
    .catch((err) => {
      res.status(400).send({ error: err })
    })

    // const salt = await genSalt()
    // console.log(salt)
    // const hashed = await hash(req.body.password, salt)
    // console.log(hashed)
    // res.locals.password = hashed
    // console.log(hashed)
    next()
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
