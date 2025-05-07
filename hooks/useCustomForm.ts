import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

export const useCustomForm = <TFieldValues extends FieldValues>(
  schema: z.ZodSchema<TFieldValues>,
  defaultValues?: Partial<z.infer<typeof schema>>, // 使用 z.infer 推导类型
) => {
  return useForm<TFieldValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues as DefaultValues<TFieldValues>,
  });
};
