import { DateValue } from '@heroui/react';
import { z } from 'zod';
import { validators } from './commonValidation';

const requiredString = validators.requiredString;
const requiredDateWithMessage = validators.requiredDateWithMessage;

const address = z.object({
  country: requiredString,
  province: requiredString,
  city: requiredString,
  address: z.string().min(10, '地址至少10个字符'),
  zipCode: z.string().min(5, '邮编至少5位'),
});
const contact = z.object({
  phone: requiredString.regex(/^1[3-9]\d{9}$/, '无效的手机号'),
  email: requiredString.email('无效的邮箱格式'),
});
const term = z.object({
  realName: requiredString.min(2, { message: '' }),
  action: requiredString,
  birthDate: requiredDateWithMessage('请选择出生日期'),
});

const base = z
  .object({
    id: z.string().optional(),
    otherName: z.string().optional(),
    socialMedia: z.string().optional(),
    socialAccount: z.string().optional(),
    sex: requiredString,
    maritalStatus: requiredString,
    birthCountry: requiredString,
    birthProvince: requiredString,
    birthCity: requiredString,
    idNumber: requiredString.regex(validators.ID_REGEX, ''),
    homeAddress: requiredString.min(10, ''),
    zipCode: requiredString.min(5, ''),
    location: requiredString,
    photoImage: validators.photoFile,
  })
  .merge(contact);

export const passport = z.object({
  documentNo: requiredString,
  userId: requiredString,
  issuedCountry: requiredString,
  issuedProvince: requiredString,
  issuedCity: requiredString,
  issuedDate: requiredDateWithMessage('请选择发行日期'),
  expirationDate: requiredDateWithMessage('请选择到期日期'),
});

export const travel = z.object({
  userId: requiredString,
  departureCity: requiredString,
  locations: requiredString,
  province: requiredString,
  city: requiredString,
  address: requiredString,
  zipCode: requiredString,
  phone: requiredString,
  departureFlight: requiredString,
  arrivalCity: requiredString,
  arrivalFlight: requiredString,
  arrivalDate: requiredDateWithMessage('请选择预计达到美国时间'),
  departureDate: requiredDateWithMessage('请选择预计离开美国时间'),
});

export const family = z.object({
  userId: requiredString,
  fatherName: requiredString,
  motherName: requiredString,
  spouseName: z.string().nullish(),
  spouseAddress: z.string().nullish(),
  spouseProvince: z.string().nullish(),
  spouseCity: z.string().nullish(),

  fatherDate: requiredDateWithMessage('请选择父亲出生日期'),
  motherDate: requiredDateWithMessage('请选择母亲出生日期'),
  spouseDate: z.custom<DateValue>().nullish(),
});

export const workAndEducation = z.object({
  userId: requiredString,
  comName: requiredString,
  occupation: requiredString,
  startDate: requiredDateWithMessage('请选择公司或学校的开始时间'),
  comCountry: requiredString,
  comAddress: requiredString,
  comPhone: requiredString,
  monthlyIncome: requiredString,

  eduName: z.string().nullish(),
  eduCourse: z.string().nullish(),
  eduStartDate: z.custom<DateValue>().nullish(),
  eduEndDate: z.custom<DateValue>().nullish(),
  eduCountry: z.string().nullish(),
  eduAddress: z.string().nullish(),
});

export const questionSchema = z
  .object({
    userId: requiredString,
    questionIndex: z.record(z.string(), z.boolean()),
    describe: z.record(z.string(), z.string()),
  })
  .superRefine((data, ctx) => {
    Object.keys(data.questionIndex).forEach((key) => {
      if (data.questionIndex[key] && !data.describe[key]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['describe', key],
          message: `说明原因`,
        });
      }
    });
  });

export type QuestionSchemaFields = z.infer<typeof questionSchema>;

const evus = z.object({
  base: base.omit({ location: true, photoImage: true }).merge(contact),
  passport: passport,
  family: family,
  workAndEducation: workAndEducation,
});

export const schemas = {
  term: term,
  base: base,
  passport: passport,
  travel: travel,
  family: family,
  workAndEducation: workAndEducation,
  question: questionSchema,
  evus: evus,
} as const;

export type SchemaTypes = {
  [K in keyof typeof schemas]: z.infer<(typeof schemas)[K]>;
};
