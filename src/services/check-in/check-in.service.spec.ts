import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInService } from './check-in-service'
import { InMemoryCheckInsRepository } from '@/repository/in-memory/in-memory-checkins-repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInsRepository)
  })

  it('should be able to Check-in', async () => {
    const { checkIn } = await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
