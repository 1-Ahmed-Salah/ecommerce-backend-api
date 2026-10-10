import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";


const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

async function connectDB() {
    try {
        
        await prisma.$connect();
        console.log('Database connected via prisma');

    } catch (error) {

        console.log(`Database connection error: ${error.message}`);
        process.exit(1);
        
    }

}

async function disconnectDB() {
    await prisma.$disconnect();
}

export { prisma, connectDB, disconnectDB }
