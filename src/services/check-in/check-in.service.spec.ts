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
      latitude: new Decimal(-22.7597016),
      longitude: new Decimal(-45.1928458)
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
      userLatitude: -22.7597016,
      userLongitude: -45.1928458
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to Check-in in twice in the same day', async () => {
    vi.setSystemTime(new Date('2022-01-01'))

    await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7597016,
      userLongitude: -45.1928458
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
      userLatitude: -22.7597016,
      userLongitude: -45.1928458
    })

    // 2th day
    vi.setSystemTime(new Date('2022-02-01'))

    const { checkIn } = await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7597016,
      userLongitude: -45.1928458
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant academy', async () => {
    academyRepository.items.push({
      id: 'gym-02',
      title: 'Academy Javascript Cycle',
      description: 'Academy Javascript Cycle FullStack',
      phone: '123456789',
      latitude: new Decimal(-22.7829348),
      longitude: new Decimal(-45.1794276)
    })

    vi.setSystemTime(new Date('2022-01-01'))

    await expect(async () => await sut.execute({
      gymID: 'gym-02',
      userId: 'user-01',
      userLatitude: -22.7597016,
      userLongitude: -45.1928458
    })).rejects.toBeInstanceOf(Error)
  })
})
