import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      return res.sendStatus(500)
    }

    // const { email } = req.body +++ role? name?
    const { userName } = req.body
    jwt.sign(
      { userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' }, //מתי פג תוקפו
      (err, accessToken) => {
        if (err) {
          console.error(err)
          return res.sendStatus(500)
        }
        res.locals.accessToken = accessToken
        next()
      }
    )
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
