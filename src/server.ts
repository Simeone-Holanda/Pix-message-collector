import express, { Router, Request, Response } from 'express'
import 'dotenv/config'

const app = express()

const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Pix message collector is online!'})
})

app.use(route)

console.log(process.env.PORT)
const port = process.env.PORT || 3005
app.listen(port, () => console.log(`server running on port ${port}`))
