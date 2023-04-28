import { prisma } from '@/lib/prisma'
import { type Prisma, type User } from '@prisma/client'
import { type UsersRepository } from './users-repository'

export class PrismaUserRepository implements UsersRepository {
  async findByEmail (email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async create (data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data
    })

    return user
  }
}
