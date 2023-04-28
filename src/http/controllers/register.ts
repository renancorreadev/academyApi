/* eslint-disable @typescript-eslint/naming-convention */
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userWithSameEmail != null) {
    return await reply.status(400).send({
      error: 'User already exists'
    })
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    }
  })

  return await reply.status(201).send()
}
