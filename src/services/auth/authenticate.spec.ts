import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'

import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateService
let userPassword: string

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(userRepository)
    userPassword = '123456'
  })

  it('should be able to authenticate ', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password_hash: await hash(userPassword, 6)
    })

    const { user } = await sut.execute({
      email: 'johndoe@test.com',
      password: userPassword
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(userRepository)

    void expect(async () =>
      await sut.execute({
        email: 'jonhdoe@test.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
