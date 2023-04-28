/* eslint-disable @typescript-eslint/naming-convention */
import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repository/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export async function registerService ({
  name,
  email,
  password
}: RegisterServiceParams): Promise<any> {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userWithSameEmail != null) {
    throw new Error('Email already in use')
  }

  const prismaUserRepository = new PrismaUserRepository()

  await prismaUserRepository.create({
    name,
    email,
    password_hash
  })
}
