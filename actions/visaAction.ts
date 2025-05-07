'use server';

import { SchemaTypes } from '@/lib/formValidationSchemas';
import { prisma } from '@/lib/prisma';
import { Family, Passport, Prisma, Travel, User, WorkAndEducation } from '@prisma/client';

// 定义包含 user 的类型
type PassportWithUser = Prisma.PassportGetPayload<{
  include: { user: true };
}>;
export const getPassportByUserId = async (userId: string): Promise<PassportWithUser | null> => {
  console.log('userId', userId);
  return prisma.passport.findFirst({
    where: { userId: userId },
    include: { user: true },
  });
};
export const getTravelByUserId = async (userId: string): Promise<Travel | null> => {
  return prisma.travel.findFirst({
    where: { userId: userId },
  });
};
export const getFamilyByUserId = async (userId: string): Promise<Family | null> => {
  return prisma.family.findFirst({
    where: { userId: userId },
  });
};
export const getWorkAndEducationByUserId = async (userId: string): Promise<WorkAndEducation | null> => {
  return prisma.workAndEducation.findFirst({
    where: { userId: userId },
  });
};
export const getUserByUserId = async (userId: string): Promise<User | null> => {
  return prisma.user.findFirst({
    where: { id: userId },
  });
};

export const upsetPassport = async (passportData: Passport) => {
  console.log(passportData);
  const { userId, ...updateData } = passportData;
  return prisma.passport.upsert({
    where: { userId: passportData.userId },
    update: updateData,
    create: passportData,
  });
};

export const upsetTravel = async (data: Travel) => {
  const { userId, ...updateData } = data;
  return prisma.travel.upsert({
    where: { userId: data.userId },
    update: updateData,
    create: data,
  });
};
export const upsetFamily = async (data: Family) => {
  const { userId, ...updateData } = data;
  return prisma.family.upsert({
    where: { userId: data.userId },
    update: updateData,
    create: data,
  });
};
export const upsetWorkAndEducation = async (data: WorkAndEducation) => {
  const { userId, ...updateData } = data;
  return prisma.workAndEducation.upsert({
    where: { userId: data.userId },
    update: updateData,
    create: data,
  });
};
export const upsetQuestion = async (userId: string, questions: { questionIndex: string; describe: string }[]) => {
  return await prisma.$transaction(async (prisma) => {
    await prisma.question.deleteMany({
      where: { userId },
    });
    return await prisma.question.createMany({
      data: questions.map((q) => ({ userId, ...q })),
    });
  });
};
export const getQuestionByUserId = async (userId: string) => {
  return prisma.question.findMany({ where: { userId } });
};
type RemoveDateFields<T> = {
  [K in keyof T as K extends `${string}Date` ? never : K]: T[K] extends object ? RemoveDateFields<T[K]> : T[K];
};
type Evus = RemoveDateFields<SchemaTypes['evus']>;

export const upsetEvus = async (user: User, passport: Passport, family: Family, workAndEducation: WorkAndEducation) => {
  const { userId } = passport;
  console.log(user);

  return await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: user,
    }),
    prisma.passport.upsert({
      where: { userId },
      update: passport,
      create: passport,
    }),
    prisma.family.upsert({
      where: { userId },
      update: family,
      create: family,
    }),
    prisma.workAndEducation.upsert({
      where: { userId },
      update: workAndEducation,
      create: workAndEducation,
    }),
  ]);
};
