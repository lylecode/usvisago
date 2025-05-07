import { prisma } from '@/lib/prisma';
import { Action } from '@prisma/client';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const birthDateStr = formData.get('birthDate')!.toString();
    const isoDate = new Date(birthDateStr);

    const data = {
      realName: formData.get('realName')!.toString(),
      action: formData.get('action')!.toString() as Action,
      birthDate: isoDate,
    };

    const user = await prisma.user.upsert({
      where: { realName_birthDate_action: { realName: data.realName, birthDate: data.birthDate, action: data.action } },
      update: data,
      create: data,
    });
    //await delay(2000);
    return Response.json(user);
  } catch (error) {
    console.error(error);
    return Response.json({ error: `Internal server error ${error}` }, { status: 500 });
  }
};
