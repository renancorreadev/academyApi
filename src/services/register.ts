import { type BcryptRepository, type UsersRepository } from '@/repository'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor (
    private readonly usersRepository: UsersRepository,
    private readonly bcryptRepository: BcryptRepository
  ) { }

  async handle ({
    name,
    email,
    password
  }: RegisterServiceParams): Promise<any> {
    const password_hash = await this.bcryptRepository.hash(password, 6)

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
