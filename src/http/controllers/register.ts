/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { RegisterService } from '@/services/register'
import { PrismaUserRepository, BcryptRepository } from '@/repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    /** Instance all Repository dependencies */
    const userRepository = new PrismaUserRepository()
    const bcryptRepository = new BcryptRepository()

    /** Instance the service with repositorys */
    const registerService = new RegisterService(userRepository, bcryptRepository)

    await registerService.handle({
      name,
      email,
      password
    })
  } catch (err: any) {
    if (err instanceof UserAlreadyExistsError) {
      return await reply.status(409).send({
        error: err.message
      })
    }

    // TODO: fix me
    throw err
  }

  return await reply.status(201).send()
}
