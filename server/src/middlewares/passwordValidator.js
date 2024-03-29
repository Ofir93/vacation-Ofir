import PasswordValidator from 'password-validator'

const schema = new PasswordValidator()

schema
  .is()
  .min(5)
  .is()
  .max(16)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()

export default (req, res, next) => {
  try {
    const errors = schema.validate(req.body.password, {
      details: true,
    })
    if (!errors.length) {
      next()
    } else {
      return res.status(400).send({ errors, where: "password-error" })
    }
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
