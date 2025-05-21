import { expect, test, describe, it, beforeEach } from "vitest"
import { compare } from "bcryptjs"
import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./error/user-already-exists"
import { GymRepository } from "@/repositories/gyms-repository";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymRepository : GymRepository;
let sut : CreateGymUseCase;

describe('Gym use case', () => {
    
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository();
        sut = new CreateGymUseCase(gymRepository)
    })


    it("should be able to create gym",async () => {
        const {gym} = await sut.execute({
            title:"Gym",
            description:"Gym 1",
            latitude:-2525,
            longitude:36636,
            phone:null
        })

        expect(gym.id).toEqual(expect.any(String))
    });

   

})


