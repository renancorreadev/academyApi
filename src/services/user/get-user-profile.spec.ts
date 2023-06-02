import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'

import { hash } from 'bcryptjs'

import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileService
let userPassword: string

describe('Get User Profile Use Case Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(userRepository)
    userPassword = '123456'
  })

  it('should be able to authenticate ', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password_hash: await hash(userPassword, 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to authenticate with wrong email', async () => {
    void expect(async () =>
      await sut.execute({
        userId: 'non-exists'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
