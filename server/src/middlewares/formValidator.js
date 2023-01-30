import { body } from 'express-validator'

const loginValidator = [
  body('userName').notEmpty().withMessage('User name is required'),
  body('password')
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
]


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

export { registerValidator, loginValidator }
