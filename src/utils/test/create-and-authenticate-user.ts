
import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateUser(app:FastifyInstance) {
    await request(app.server).post("/users").send({
        name: "Lorenzo",
        email: "lololo@gmail.com",
        password: "123456"
    })

    const autheResponse = await request(app.server).post("/sessions").send({
        name: "Lorenzo",
        email: "lololo@gmail.com",
        password: "123456"
    })

    const { token } = autheResponse.body

    return {token};
}
