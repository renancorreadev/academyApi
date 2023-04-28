/* eslint-disable @typescript-eslint/naming-convention */
import { type UsersRepository } from '@/repository/prisma/users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor (private readonly usersRepository: UsersRepository) { }

  async handle ({
    name,
    email,
    password
  }: RegisterServiceParams): Promise<any> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

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
