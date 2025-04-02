import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./error/resource-not-found-error";
import { CheckInMemoryRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";



let checkInRepository:CheckInMemoryRepository;
let sut:CheckInUseCase;

describe("Check in use case",() => {
    beforeEach(() => {
        checkInRepository = new CheckInMemoryRepository();
        sut = new CheckInUseCase(checkInRepository);
    })

    it("should be able to check in",async () => {
        
        const {checkIn} = await sut.execute({
            gymId:"1",
            userId:"1"
        })
         
        expect(checkIn.id).toEqual(expect.any(String))
    });
});