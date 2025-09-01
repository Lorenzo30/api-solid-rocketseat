import { describe, it, expect, beforeAll, afterAll } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Create Gym (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close();
    })

    it("it shoud be able create gym", async () => {

        const { token } = await createAndAuthenticateUser(app);

        const createGymResponse = await request(app.server).post("/gyms")
            .set('Authorization', `Bearer ${token}`)
            .send({
                "title": "aqui",
                "description": "ocwkcw",
                "phone": "55555",
                "latitude": 35,
                "longitude": 36
            });

        expect(createGymResponse.statusCode).toEqual(201);
    })
})