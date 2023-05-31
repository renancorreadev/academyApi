/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { PrismaUserRepository } from '@/repository'
import { AuthenticateService } from '@/services/auth/authenticate'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

export async function authenticate (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    /** Instance all Repository dependencies */
    const userRepository = new PrismaUserRepository()

    /** Instance the service with repositorys */
    const authenticateService = new AuthenticateService(userRepository)

    await authenticateService.execute({
      email,
      password
    })
  } catch (err: any) {
    if (err instanceof InvalidCredentialsError) {
      return await reply.status(409).send({
        error: err.message
      })
    }

    // TODO: fix me
    throw err
  }

  return await reply.status(200).send()
}
