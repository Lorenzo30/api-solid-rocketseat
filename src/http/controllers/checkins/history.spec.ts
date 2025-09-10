import { describe, it, expect, beforeAll, afterAll } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"

describe("Checkin history (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close();
    })

    it("it shoud be able history checkins", async () => {

        const { token } = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow();

        const gym = await prisma.gym.create({
            data: {
                title: "JavaSCritpgym",
                "latitude": 35,
                "longitude": 36
            }

        })

        const checkins = await prisma.checkIn.createMany({
            data: [{
                gym_id: gym.id,
                user_id: user.id
            },
            {
                gym_id: gym.id,
                user_id: user.id
            }
            ]
        })


         const response = await request(app.server).get(`/check-ins/history`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.checkIns)
    })
})