import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import fs from 'node:fs/promises';
import path from 'path';

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const formObject = Object.fromEntries(Array.from(formData.entries()).filter(([key]) => key !== 'photoImage'));

    const file = formData.get('photoImage') as File;
    const ext = path.extname(file.name);
    const photoImage = Date.now() + ext;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${photoImage}`, buffer);

    console.log('formObject', formObject);
    const user = await prisma.user.update({
      where: {
        id: formObject.id.toString(),
      },
      data: { ...formObject, photoImage: photoImage },
    });

    return Response.json(user);
  } catch (error) {
    console.error(error);

    return Response.json({ error: `Internal server error${error}` }, { status: 500 });
  }
};
