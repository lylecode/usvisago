import { bcryptPasswordHash } from '@/lib/bcrypt';
import { PrismaClient } from '@prisma/client';

export async function seedAdmin(prisma: PrismaClient) {
  const hashedPassword = await bcryptPasswordHash('admin');
  //   const admin = await prisma.user.create({
  //     data: {
  //       realName: 'Admin User', // 必填字段

  //     },
  //   });

  // console.log('Admin created: ', admin);

  //return admin;
  return null;
}
