/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export async function appRoutes (app: FastifyInstance) {
  app.post('/users', register)
}
