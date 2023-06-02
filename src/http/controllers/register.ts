/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/services/factories/make-register-use-case'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    /**
     * Instance all Repository dependencies with dependency injection in factories in makeRegisterUseCase.ts
     * @note registeService = registerUseCase
    */
    const registerService = makeRegisterUseCase()

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
