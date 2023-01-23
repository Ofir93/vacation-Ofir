import { body } from 'express-validator'

// const validator = [body('email').isEmail().withMessage('Invalid email')]
// {
//   user_name: 'Bliz',
//   password: '1234',
//   first_name: 'Ofir',
//   last_name: 'by'
// }
const registerValidator = [
  body('user_name').notEmpty().withMessage('Username is required'),
  body('password')
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
  body('first_name').notEmpty().withMessage('Invalid first name'),
  body('last_name').notEmpty().withMessage('last name'),
]

export { registerValidator }
