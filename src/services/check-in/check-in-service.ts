/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repository/check-ins/check-ins-repository-model'
import { type AcademyRepository } from '@/repository/academy/academy-repository-model'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-coordinate'

interface CheckInServiceRequest {
  userId: string
  gymID: string
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor (
    private readonly checkInRepository: CheckInsRepository,
    private readonly academyRepository: AcademyRepository
  ) {}

  async execute ({ userId, gymID, userLatitude, userLongitude }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const academy = await this.academyRepository.findById(gymID)

    if (academy == null) {
      throw new Error('Academy not found')
    }

    // calculate distance between user and academy if > 100 m (0.1 km) throw error
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: academy.latitude.toNumber(), longitude: academy.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KM = 0.1
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new Error('Academy is too far from you')
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay != null) {
      throw new Error('Check-in already registered on this day')
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymID,
      user_id: userId
    })

    return { checkIn }
  }
}
