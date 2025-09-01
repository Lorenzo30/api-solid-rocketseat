import { describe, it, expect, beforeAll, afterAll } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Search Gym (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close();
    })

    it("it shoud be able search gym", async () => {

        const { token } = await createAndAuthenticateUser(app);

        await request(app.server).post("/gyms")
            .set('Authorization', `Bearer ${token}`)
            .send({
                "title": "TypeScript gym",
                "description": "ocwkcw",
                "phone": "55555",
                "latitude": 35,
                "longitude": 36
            });

        await request(app.server).post("/gyms")
            .set('Authorization', `Bearer ${token}`)
            .send({
                "title": "JavaScript gym",
                "description": "ocwkcw",
                "phone": "55555",
                "latitude": 35,
                "longitude": 36
            });

        const response = await request(app.server).get("/gyms/search")
        .query({
            q:"JavaScript"
        })
        .set('Authorization', `Bearer ${token}`)


        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title:"JavaScript gym"
            })
        ])
    })
})