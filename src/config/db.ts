import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { DATABASE_URL } from "../secrets";


const connectionString = `${DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter })
    .$extends({
        result: {
            address: {
                formattedAddress: {
                    needs: {
                        lineOne: true,
                        lineTwo: true,
                        city: true,
                        country: true,
                        pincode: true
                    },
                    compute(addr) {
                        return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}, ${addr.pincode}`;
                    } 
                }
            }
        }
    });

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
