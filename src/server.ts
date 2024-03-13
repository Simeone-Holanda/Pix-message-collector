import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './Routes'

const app = express()

app.use(morgan('dev'))

app.use(helmet())

app.use(express.json())
app.use(routes)

const port = process.env.PORT || 3005
app.listen(port, () => console.log(`server running on port ${port}`))
