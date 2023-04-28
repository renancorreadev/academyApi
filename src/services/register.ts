/* eslint-disable @typescript-eslint/naming-convention */
import { prisma } from '@/lib/prisma'

import { hash } from 'bcryptjs'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor (private readonly usersRepository: any) {

  }

  async handle ({
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

    await this.usersRepository.create({
      name,
      email,
      password_hash
    })
  }
}
