import { App } from './app'
import 'dotenv/config'
const app = new App()

app.listen(parseInt(process.env.PORT) || 3005)
