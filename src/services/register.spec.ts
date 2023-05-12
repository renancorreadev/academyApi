import { describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { BcryptRepository } from '@/repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register ', async () => {
    const userRepository = new InMemoryUsersRepository()
    const bcryptRepository = new BcryptRepository()
    const registerService = new RegisterService(userRepository, bcryptRepository)

    const userPassword = '123456'
    const { user } = await registerService.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: userPassword
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const userRepository = new InMemoryUsersRepository()
    const bcryptRepository = new BcryptRepository()
    const registerService = new RegisterService(userRepository, bcryptRepository)

    const userPassword = '123456'
    const { user } = await registerService.handle({
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
    const userRepository = new InMemoryUsersRepository()
    const bcryptRepository = new BcryptRepository()
    const registerService = new RegisterService(userRepository, bcryptRepository)

    const userEmail = 'johndoe@example.com'

    await registerService.handle({
      name: 'John Doe',
      email: userEmail,
      password: '123456'
    })

    await expect(async () => await registerService.handle({
      name: 'John Doe',
      email: userEmail,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
