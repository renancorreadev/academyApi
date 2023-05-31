import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { BcryptRepository } from '@/repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let userRepository: InMemoryUsersRepository
let bcryptRepository: BcryptRepository
let sut: RegisterService

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    bcryptRepository = new BcryptRepository()
    sut = new RegisterService(userRepository, bcryptRepository)
  })

  it('should be able to register ', async () => {
    const userPassword = '123456'
    const { user } = await sut.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: userPassword
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const userPassword = '123456'
    const { user } = await sut.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: userPassword
    })

    if (user.password_hash == null) {
      throw new Error('Password was not set')
    }

    const isPasswordCorrectHahed = await compare(
      userPassword,
      user.password_hash
    )

    expect(isPasswordCorrectHahed).toBe(true)
  })

  it('should not be able to register a user with same email twice', async () => {
    const userEmail = 'johndoe@example.com'

    await sut.handle({
      name: 'John Doe',
      email: userEmail,
      password: '123456'
    })

    await expect(async () => await sut.handle({
      name: 'John Doe',
      email: userEmail,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
