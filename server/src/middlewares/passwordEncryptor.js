import bcrypt from 'bcryptjs'

export default async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(req.body.password, salt)

    res.locals.password = hash
    next()
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
