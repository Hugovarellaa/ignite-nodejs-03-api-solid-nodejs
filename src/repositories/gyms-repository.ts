import { Gym, Prisma } from '@prisma/client'

export interface IFindManyNearByParams {
	latitude: number
	longitude: number
}

export interface IGymsRepository {
	create(data: Prisma.GymCreateInput): Promise<Gym>
	findById(id: string): Promise<Gym | null>
	searchMany(query: string, page: number): Promise<Gym[]>
	findManyNearBy(params: IFindManyNearByParams): Promise<Gym[]>
}
