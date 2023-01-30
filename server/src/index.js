import express from 'express'
import registerLogIn from './routers/auth.js'
// import vacations from './routers/vacation.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)


app.use(express.json())
app.use('/auth', registerLogIn)
// app.use('/vacations', vacations)



app.use((req, res) => {
  try {
    res.sendStatus(404).send(`Resource ${req.url} not supported!`)
  } catch (error) {
    res.status(500)
  }
})

app.listen(process.env.APP_PORT, () =>
  console.log(`server is listening on port ${process.env.APP_PORT}`)
)
