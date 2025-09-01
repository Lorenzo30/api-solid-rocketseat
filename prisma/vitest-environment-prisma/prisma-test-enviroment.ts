import { prisma } from "@/lib/prisma";
import { execSync } from "child_process";
import { randomUUID } from "crypto"
import "dotenv/config"

import type { Environment } from "vitest"


function generateDatabaseUrl(schema:string){
   if (!process.env.DATABASE_URL) {
        throw new Error("Please provide a DATABASE_URL")
   }

   const url = new URL(process.env.DATABASE_URL);
   url.searchParams.set("schema",schema);

   return url.toString();
}

export default <Environment> {
    name:"prisma",
    transformMode:"ssr",
    async setup() {

        const schema = randomUUID();
        const databaseUrl = generateDatabaseUrl(schema);

        process.env.DATABASE_URL = databaseUrl;

        console.log(process.env.DATABASE_URL);

        execSync("npx prisma migrate deploy");

        console.log("prisma migrate")

        return {
            async teardown(){
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);

                await prisma.$disconnect();
            }
        }
    }
}