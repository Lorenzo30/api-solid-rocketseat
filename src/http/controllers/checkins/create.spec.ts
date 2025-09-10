import { describe, it, expect, beforeAll, afterAll } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"

describe("Create Gym (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close();
    })

    it("it shoud be able crate checkin", async () => {

        const { token } = await createAndAuthenticateUser(app);

        const gym = await prisma.gym.create({
            data:{
                title:"JavaSCritpgym",
                "latitude": 35,
                "longitude": 36
            }
           
        })

        const response = await request(app.server).post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "latitude": 35,
                "longitude": 36
            });

        expect(response.statusCode).toEqual(201);
    })
})