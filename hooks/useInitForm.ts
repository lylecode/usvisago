import api from '@/lib/ky';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { useCustomForm } from './useCustomForm';

export const useInitForm = <TForm extends FieldValues, TFormData = unknown>(
  schema: z.ZodSchema<TForm>,
  formDataFn: (userId: string) => Promise<TFormData | null>,
  userId: string,
) => {
  const router = useRouter();
  const form = useCustomForm(schema);

  const { data: userData } = useQuery<User | null>({
    queryKey: ['userData', userId],
    queryFn: () => api.get(`/api/visa/term/${userId}`).json<User>(),
    enabled: !!userId,
  });

  const { data: defaultData } = useQuery<TFormData | null>({
    queryKey: ['defaultDate', userId],
    queryFn: () => formDataFn(userId),
    enabled: !!userId,
  });

  return {
    router,
    form,
    userData,
    defaultData,
  };
};
