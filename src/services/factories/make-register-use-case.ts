import { BcryptRepository, PrismaUserRepository } from '@/repository'
import { RegisterService } from '../register'

export function makeRegisterUseCase (): RegisterService {
  const userRepository = new PrismaUserRepository()
  const bcryptRepository = new BcryptRepository()
  const registerService = new RegisterService(userRepository, bcryptRepository)

  return registerService
}
