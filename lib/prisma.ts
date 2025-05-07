import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient({
    // log: [
    //   {
    //     emit: 'stdout',
    //     level: 'query',
    //   },
    //   {
    //     emit: 'stdout',
    //     level: 'error',
    //   },
    //   {
    //     emit: 'stdout',
    //     level: 'info',
    //   },
    //   {
    //     emit: 'stdout',
    //     level: 'warn',
    //   },
    // ],
  });
};

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma = globalThis.prismaGlobal ?? (globalThis.prismaGlobal = prismaClientSingleton());
