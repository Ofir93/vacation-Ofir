import { Request, Response, NextFunction } from "express"
import { readFile } from "fs/promises"
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { Admin, Role } from "../types"


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(res.locals.admin.role === Role.CTO || res.locals.admin.role === Role.ADMIN){
            next()
        }
        res.status(403).send({errors: ['You do not have permission']})
    } catch (error) {
        console.error(error)
        res.sendStatus(500)

    }
}