
import { type User, type Prisma } from '@prisma/client'
import { type UsersRepository } from '../prisma/users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById (id: string): Promise<User | null> {
    const user = this.items.find(item => item.id === id)

    if (user == null) {
      return null
    }

    return user
  }

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
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: passwordHash,
      created_at: new Date()
    }

    this.items.push(user)

    return user
  }
}
