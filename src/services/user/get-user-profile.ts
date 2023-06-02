/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { type UsersRepository } from '@/repository'
import { type User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetUserProfileServiceRequest {
  userId: string
}

interface GetUserProfileServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor (
    private readonly usersRepository: UsersRepository
  ) {}

  async execute ({ userId }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (user == null) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}
