import express from 'express'
import register from './routers/auth.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use('/auth', register)



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
