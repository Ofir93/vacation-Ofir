import express, { Application, Request, Response } from 'express'
import 'dotenv/config'
import { readFile, writeFile } from 'fs/promises'
import { responseError, doesUserExist } from './utils'
import { User } from './types'
import authenticateCto from './middlewares/authenticateCto'
import jwtVerify from './middlewares/jwtVerify'
import authenticateAdmin from './middlewares/authenticateAdmin'

const app: Application = express()

const filePath = `${process.cwd()}/../db/users.json`

app.use(express.json())

app.get('/',jwtVerify,  async (req: Request, res: Response) => {
    try {
        const firstName = req.query.first_name
        const lastName = req.query.last_name
        const email = req.query.email

        const users: User[] = JSON.parse(await readFile(filePath, 'utf8'))

        if (!firstName && !lastName && !email) {
            return res.send(users)
        }

        const filterdUsers = users.filter(user =>
            (!firstName || firstName && user.first_name === firstName) &&
            (!lastName || lastName && user.last_name === lastName) &&
            (!email || email && user.email === email)
        )

        filterdUsers.length ? res.send(filterdUsers) : res.status(404).send({ message: 'Users not found with your criteria' })
    } catch (error) {
        responseError(error, res)
    }
})

app.get('/:id',jwtVerify, async (req: Request, res: Response) => {
    try {
        const userId = +req.params.id
        const users: User[] = JSON.parse(await readFile(filePath, 'utf8'))
        const [user] = users.filter(user => user.id === userId)

        user ? res.send(user) : res.status(404).send(`User ${userId} not found`)
    } catch (error) {
        responseError(error, res)
    }
})

app.post('/',[jwtVerify, authenticateAdmin], async (req: Request, res: Response) => {
    try {
        const users: User[] = JSON.parse(await readFile(filePath, 'utf8'))

        const id: number = users.reduce((max: number, currentValue: User) =>
            max > currentValue.id ? max : currentValue.id
            , 0)

        const newUser = { id: id + 1, ...req.body }

        users.push(newUser)

        await writeFile(filePath, JSON.stringify(users, null, 2))

        res.send(newUser)

    } catch (error) {
        responseError(error, res)
    }
})

app.put('/:id',[jwtVerify, authenticateAdmin], async (req: Request, res: Response) => {
    try {
        const userId = +req.params.id
        const users: User[] = JSON.parse(await readFile(filePath, 'utf8'))

        if (!doesUserExist(userId, users)) {
            return res.status(404).send(`User ${userId} not found`)
        }

        const updatedUsers = users.map(user => user.id === userId ? { id: userId, ...req.body } : user)

        await writeFile(filePath, JSON.stringify(updatedUsers, null, 2))

        const [user] = updatedUsers.filter(user => user.id === userId)
        res.send(user)
    } catch (error) {
        responseError(error, res)
    }
})

app.patch('/:id',[jwtVerify, authenticateAdmin], async (req: Request, res: Response) => {
    try {
        const userId = +req.params.id
        const users: User[] = JSON.parse(await readFile(filePath, 'utf8'))

        if (!doesUserExist(userId, users)) {
            return res.status(404).send(`User ${userId} not found`)
        }

        const updatedUsers: User[] = users.map(user => user.id === userId ? { ...user, ...req.body } : user)

        await writeFile(filePath, JSON.stringify(updatedUsers, null, 2))

        const [user] = updatedUsers.filter(user => user.id === userId)
        res.send(user)
    } catch (error) {
        responseError(error, res)
    }
})

app.delete('/:id',[jwtVerify, authenticateCto] , async (req: Request, res: Response) => {
    try {
        const userId = +req.params.id
        const users: User[] = JSON.parse(await readFile(filePath, 'utf8'))

        if (!doesUserExist(userId, users)) {
            return res.status(404).send(`User ${userId} not found`)
        }

        const filteredUsers = users.filter(user => user.id !== userId)

        await writeFile(filePath, JSON.stringify(filteredUsers, null, 2))

        res.send(filteredUsers)
    } catch (error) {
        responseError(error, res)
    }
})

app.use((req: Request, res: Response) => res.status(404).send('Endpoint not supported'))

const port = +(process.env.APP_PORT || 3009)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})