import { expect, test, describe, it, beforeEach } from "vitest"
import { compare } from "bcryptjs"
import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./error/user-already-exists"
import { GymRepository } from "@/repositories/gyms-repository";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";
import { CheckInMemoryRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInRepository : CheckInsRepository;
let sut : GetUserMetricsUseCase;

describe('Metrics use case', () => {
    
    beforeEach(() => {
        checkInRepository = new CheckInMemoryRepository();
        sut = new GetUserMetricsUseCase(checkInRepository)
    })


    it("should be able get count checkins ",async () => {
        await checkInRepository.create({
            gym_id:"gym-01",
            user_id:"01"
        })

        await checkInRepository.create({
            gym_id:"gym-02",
            user_id:"01"
        })

        const checkIns = await sut.execute({userId:"01"})

        expect(checkIns).toEqual({"checkInsCount":2})
    });

   

})


