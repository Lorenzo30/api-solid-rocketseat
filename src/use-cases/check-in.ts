import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { CheckIn } from "@prisma/client";

interface CheckInRequest {
  userId:string,
  gymId:string
}

interface CheckInResponse {
  checkIn:CheckIn
}


export class CheckInUseCase {
    constructor(private checkInRepository:CheckInsRepository){}

    async execute({userId,gymId}:CheckInRequest){
        
        const checkIn = await this.checkInRepository.create({
            gym_id:gymId,
            user_id:userId
        })

        return {
            checkIn
        }

    }
}