import { type BcryptRepository, type UsersRepository } from '@/repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { type User } from '@prisma/client'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
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
  }: RegisterServiceParams): Promise<RegisterServiceResponse> {
    const password_hash = await this.bcryptRepository.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail != null) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return { user }
  }
}
