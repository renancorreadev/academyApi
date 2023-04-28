/* eslint-disable @typescript-eslint/no-floating-promises */
import fastify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)
