import { body } from 'express-validator'

// const validator = [body('email').isEmail().withMessage('Invalid email')]
// {
//   user_name: 'Bliz',
//   password: '1234',
//   first_name: 'Ofir',
//   last_name: 'by'
// }
const registerValidator = [
  body('userName').notEmpty().withMessage('User name is required'),
  body('password')
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
  body('firstName').notEmpty().withMessage('Invalid first name'),
  body('lastName').notEmpty().withMessage('Invalid last name'),
]

export { registerValidator }
