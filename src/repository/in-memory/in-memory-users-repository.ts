
import { type User, type Prisma } from '@prisma/client'
import { type UsersRepository } from '../prisma/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail (email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)

    if (user == null) {
      return null
    }

    return user
  }

  async create (data: Prisma.UserCreateInput): Promise<User> {
    const passwordHash = data.password_hash ?? null

    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: passwordHash,
      created_at: new Date()
    }

    this.items.push(user)

    return user
  }
}
