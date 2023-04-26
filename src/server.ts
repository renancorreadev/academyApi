import { app } from './app'
import { env } from './env'

void app.listen({
  port: env.PORT,
  host: '0.0.0.0'
}).then(() => {
  console.log('HTTP server is Running!! 🚀')
})
