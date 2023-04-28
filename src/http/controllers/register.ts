/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { RegisterService } from '@/services/register'
import { PrismaUserRepository } from '@/repository/prisma/prisma-users-repository'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    /** Instance userRepository to pass parameter Register Service  */
    const userRepository = new PrismaUserRepository()
    const registerService = new RegisterService(userRepository)

    await registerService.handle({
      name,
      email,
      password
    })
  } catch (err: any) {
    return await reply.status(409).send({
      error: err.message
    })
  }

  return await reply.status(201).send()
}
