import { Response } from 'express'
import { User } from './types'

export const responseError = (error: Error | unknown, res: Response): void => {
    const errMsg = error instanceof Error ? error.message : 'Unexpected error'
    console.error(errMsg)
    res.status(500).send()
}

export const doesUserExist = (id: number, users: User[]): boolean => {
    const [user] = users.filter(user => user.id === id)
    return user ? true : false
}
