import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./error/resource-not-found-error";
import { CheckInMemoryRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInHistoryUseCase } from "./fetch-user-checkin-history";



let checkInRepository: CheckInMemoryRepository;
let sut: FetchUserCheckInHistoryUseCase;

describe("fetch checkin history use case", () => {
    beforeEach( async () => {
        checkInRepository = new CheckInMemoryRepository();
        sut = new FetchUserCheckInHistoryUseCase(checkInRepository);
    })

    it("should be able fetch checkin history", async () => {

        await checkInRepository.create({
            gym_id:"1",
            user_id:"1"
        })

        await checkInRepository.create({
            gym_id:"2",
            user_id:"1"
        })
        
        const {checkIns} = await sut.execute({
            userId:"1",
            page:1
        })
       
        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id:"1"}),
            expect.objectContaining({gym_id:"2"})
        ])
    });

    it("should be able to fetch paginated checkin",async () => {
        for (let i = 1; i<=22; i++) {
            await checkInRepository.create({
                gym_id:`gym-${i}`,
                user_id:"1"
            })
        }

        const {checkIns} = await sut.execute({
            userId:"1",
            page:2
        })


        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id:"gym-21"}),
            expect.objectContaining({gym_id:"gym-22"}),
        ])

    });

});