import { InMemoryUsersRepoitory } from "@/repositories/in-memory/in-memory-users-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FetchUserCheckInHistoryUseCase } from "./fetch-user-checkin-history";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";
import { title } from "process";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";



let gymRepository: InMemoryGymRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gyms  use case", () => {
    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository();
        sut = new FetchNearbyGymsUseCase(gymRepository)
    })

    it("should be able to fetch nearby gyms", async () => {

        await gymRepository.create({
            title: "Near gym",
            description: null,
            phone: null,
            latitude: -27.6910708,
            longitude: -48.6751197
        })

        await gymRepository.create({
            title: "Far gym",
            description: null,
            phone: null,
            latitude: -30.6137261,
            longitude: -50.6607895
        })

        const { gyms } = await sut.execute({
            UserLatitude:-27.6910708,
            UserLongitude:-48.6751197
        })

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Near gym" })
        ])
    });


   

});