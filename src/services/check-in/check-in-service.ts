/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repository/check-ins/check-ins-repository'

interface CheckInServiceRequest {
  userId: string
  gymID: string
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor (private readonly checkInRepository: CheckInsRepository) {}

  async execute ({ userId, gymID }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkIn = await this.checkInRepository.create({
      gym_id: gymID,
      user_id: userId
    })

    return { checkIn }
  }
}
