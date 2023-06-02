import { PrismaUserRepository } from '@/repository'
import { AuthenticateService } from '../auth/authenticate'

export function makeAuthenticateUseCase (): AuthenticateService {
  const usersRepository = new PrismaUserRepository()
  const authenticateService = new AuthenticateService(usersRepository)

  return authenticateService
}
