import { Gym, User } from "@prisma/client";
import { GymRepository } from "@/repositories/gyms-repository";


interface FetchNearbyGymsUseCaseRequest {
  UserLatitude:number,
  UserLongitude:number
}

interface FetchNearbyGymsUseCaseResponse {
    gyms:Gym[]
}


export class FetchNearbyGymsUseCase {

    constructor(
        private gymRepository:GymRepository
    ) {}

    async execute ({UserLatitude,UserLongitude}:FetchNearbyGymsUseCaseRequest) : Promise<FetchNearbyGymsUseCaseResponse> {
        const gyms = await this.gymRepository.findManyNearby({latitude:UserLatitude,longitude:UserLongitude})
        return {gyms}
    }
}

