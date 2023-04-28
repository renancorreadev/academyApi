import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password
    }
  })

  return await reply.status(201).send()
}