import { Gym, User } from "@prisma/client";
import { GymRepository } from "@/repositories/gyms-repository";


interface SearchGymsUseCaseRequest {
  query:string,
  page:number
}

interface SearchGymsUseCaseResponse {
    gyms:Gym[]
}


export class SearchGymsUseCase {

    constructor(
        private gymRepository:GymRepository
    ) {}

    async execute ({page,query}:SearchGymsUseCaseRequest) : Promise<SearchGymsUseCaseResponse> {
        const gyms = await this.gymRepository.searchMany(query,page)
        return {gyms}
    }
}

