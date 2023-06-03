import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in-service'
import { InMemoryCheckInsRepository } from '@/repository/in-memory/in-memory-checkins-repository'
import { InMemoryAcademyRepository } from '@/repository/in-memory/in-memory-academys-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let academyRepository: InMemoryAcademyRepository
let sut: CheckInService

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    academyRepository = new InMemoryAcademyRepository()
    sut = new CheckInService(checkInsRepository, academyRepository)

    academyRepository.items.push({
      id: 'gym-01',
      title: 'Academy Javascript Cycle',
      description: 'Academy Javascript Cycle FullStack',
      phone: '123456789',
      latitude: new Decimal(0),
      longitude: new Decimal(0)
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to Check-in', async () => {
    vi.setSystemTime(new Date('2022-01-01'))
    const { checkIn } = await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to Check-in in twice in the same day', async () => {
    vi.setSystemTime(new Date('2022-01-01'))

    await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0
    })

    await expect(async () => {
      await sut.execute({
        gymID: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should  be able to Check-in in twice but in differents day', async () => {
    vi.setSystemTime(new Date('2022-01-01'))

    await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0
    })

    // 2th day
    vi.setSystemTime(new Date('2022-02-01'))

    const { checkIn } = await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
