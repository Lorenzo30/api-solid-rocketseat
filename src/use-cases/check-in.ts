import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./error/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-cordinates";
import { MaxNumberOfCheckInsError } from "./error/max-number-of-check-in-error";
import { MaxDistanceError } from "./error/max-distance-error";

interface CheckInRequest {
  userId:string,
  gymId:string,
  latitude:number,
  longitude:number
}

interface CheckInResponse {
  checkIn:CheckIn
}


export class CheckInUseCase {
    constructor(
      private checkInRepository:CheckInsRepository,
      private gymsRepository:GymRepository
    ){}

    async execute({userId,gymId,latitude,longitude}:CheckInRequest){


        const gym = await this.gymsRepository.findById(gymId)

        const distance = getDistanceBetweenCoordinates({latitude:latitude,longitude:longitude},{latitude:gym?.latitude.toNumber(),longitude:gym?.longitude.toNumber()})

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const MAX_DISTANCE = 0.1;

        if (distance > MAX_DISTANCE) {
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId,new Date())

        if (checkInOnSameDay) {
           throw new MaxNumberOfCheckInsError();
        }
        
        const checkIn = await this.checkInRepository.create({
            gym_id:gymId,
            user_id:userId
        })

        return {
            checkIn
        }

    }
}