
import { hash } from 'bcryptjs'
import { type EncriptRepositoryModel } from './encript-repository-model'

export class BcryptRepository implements EncriptRepositoryModel {
  async hash (password: string, salt: number): Promise<string> {
    const hashCrypt = await hash(password, salt)

    return hashCrypt
  }
}
