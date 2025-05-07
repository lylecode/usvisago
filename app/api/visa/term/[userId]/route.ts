import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest, context: any) => {
  try {
    const { userId } = await context.params; // 直接从 context.params 获取 userId    console.log('userId:', userId);
    const user = await prisma.user.findFirst({ where: { id: userId } });
    return Response.json(user);
  } catch (error) {
    console.error(error);
    return Response.json({ error: `Internal server error ${error}` }, { status: 500 });
  }
};
