import { toHerouiDate } from '@/lib/utils';
import { DateValue } from '@heroui/react';
import { getLocalTimeZone } from '@internationalized/date';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { FieldValues, UseFormReset } from 'react-hook-form';
import { ZodObject, ZodRawShape } from 'zod';

type FormResetOptions<T extends FieldValues> = {
  schema: ZodObject<ZodRawShape>;
  reset: UseFormReset<T>;
  defaultValues?: Partial<T>;
  excludeKeys?: string[];
  dateFormat?: string;
};

export const useResetForm = <T extends FieldValues>({
  schema,
  reset,
  defaultValues,
  excludeKeys = [],
  dateFormat = 'yyyy-MM-dd',
}: FormResetOptions<T>) => {
  useEffect(() => {
    if (!schema || !reset) return;

    const shapeKeys = Object.keys(schema.shape);
    const initialValues = Object.fromEntries(
      shapeKeys
        .filter((key) => !excludeKeys.includes(key))
        .map((key) => {
          const value = defaultValues?.[key as keyof T] ?? '';

          // 使用 @internationalized/date 处理日期
          const dateValue = toDateValue(value);
          if (dateValue) {
            return [key, format(dateValue.toDate(getLocalTimeZone()), dateFormat)];
          }
          return [key, value || ''];
        }),
    ) as T;

    reset(initialValues);
  }, [schema, JSON.stringify(defaultValues)]);
};

// 使用 @internationalized/date 安全转换日期
function toDateValue(value: unknown): DateValue | null {
  if (!value) return null;

  try {
    // 处理字符串日期 (ISO格式)
    if (typeof value === 'string') {
      return toHerouiDate(new Date(value)) ?? null;
    }

    // 处理 Date 对象
    if (value instanceof Date) {
      return toHerouiDate(value) ?? null;
    }

    // 处理时间戳
    if (typeof value === 'number') {
      return toHerouiDate(new Date(value)) ?? null;
    }

    // 处理国际化的 DateValue 对象
    if (typeof value === 'object' && value !== null && 'toDate' in value) {
      return value as DateValue;
    }

    // try {
    //   // 处理字符串日期 (ISO格式)
    //   if (typeof value === 'string') {
    //     return parseDate(value);
    //   }

    //   // 处理 Date 对象
    //   if (value instanceof Date) {
    //     return parseDate(value.toISOString());
    //   }

    //   // 处理时间戳
    //   if (typeof value === 'number') {
    //     return parseDate(new Date(value).toISOString());
    //   }

    //   // 处理国际化的 DateValue 对象
    //   if (typeof value === 'object' && value !== null && 'toDate' in value) {
    //     return value as DateValue;
    //   }
  } catch {
    return null;
  }

  return null;
}
