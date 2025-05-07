import { DateValue } from '@heroui/react';
import { getLocalTimeZone, parseDate, toZoned } from '@internationalized/date';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns/format';
import { twMerge } from 'tailwind-merge';
import { z, ZodObject } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const toHerouiDate = (date?: Date): DateValue | undefined => {
  if (!date) return undefined;
  const zoned = toZoned(parseDate(format(date, 'yyyy-MM-dd')), getLocalTimeZone());
  return zoned as unknown as DateValue;
};

export const isDate = (value: unknown): value is Date => value instanceof Date;

export const toFormData = (data: any, schema: ZodObject<any>) => {
  if (!data) return {};

  return Object.fromEntries(
    Object.keys(schema.shape).map((key) => {
      const value = data[key];
      // return [key, isDate(value) ? format(value, 'yyyy-MM-dd') : (value ?? key.includes('Date')) ? null : ''];
      return [key, isDate(value) ? format(value, 'yyyy-MM-dd') : (value ?? '')];
    }),
  ) as Partial<z.infer<typeof schema>>;
};
