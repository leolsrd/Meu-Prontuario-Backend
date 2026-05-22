import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// import { PrismaClient } from '@prisma/client/extension';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({
  connectionString,
});

const prismaClient = new PrismaClient({ adapter });

export default  prismaClient;
