import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepoitory implements UsersRepository {

    public items: User[] = []

    async findById(id: string): Promise<User | null> {
        const user = this.items.find((item) => item.id == id)

        if (!user) {
            return null;
        }

        return user;
    }
     

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((item) => item.email == email)

        if (!user) {
            return null;
        }

        return user;
    }
     
    

    async create(data: Prisma.UserCreateInput): Promise<User> {
       const user = {
            id:"user-1",
            email:data.email,
            name:data.name,
            created_at:new Date(),
            password_hash:data.password_hash
        }

        this.items.push(user);

        return user;
    }

}