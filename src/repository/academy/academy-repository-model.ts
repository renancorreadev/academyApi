
import { type Gym } from '@prisma/client'

export interface AcademyRepository {
  findById: (id: string) => Promise<Gym | null>
}
