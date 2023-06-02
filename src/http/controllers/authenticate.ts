/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case'

export async function authenticate (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateUseCase()

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
