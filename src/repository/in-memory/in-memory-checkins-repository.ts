/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type CheckIn, type Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository {
  public items: CheckIn[] = []

  async create (data: Prisma.CheckInUncheckedCreateInput): Promise<any> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }

    this.items.push(checkIn)

    return checkIn
  }
}
