import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin.seed';

const prisma = new PrismaClient();

async function main() {
  seedAdmin(prisma);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
