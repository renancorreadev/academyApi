
import { type Gym } from '@prisma/client'

import { type AcademyRepository } from '../academy/academy-repository-model'

export class InMemoryAcademyRepository implements AcademyRepository {
  public items: Gym[] = []

  async findById (id: string): Promise<Gym | null> {
    const academy = this.items.find(item => item.id === id)

    if (academy == null) {
      return null
    }

    return academy
  }
}
