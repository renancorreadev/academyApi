/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { registerService } from '@/services/register'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    await registerService({
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
