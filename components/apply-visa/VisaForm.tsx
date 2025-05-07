'use client';

import { useInitForm } from '@/hooks/useInitForm';
import { useResetForm } from '@/hooks/useResetForm';
import { useMutation } from '@tanstack/react-query';
import { FormProvider } from 'react-hook-form';
import { z, ZodObject, ZodRawShape } from 'zod';
import Container from '../layout/Container';
import StepProgress from './StepProgress';
import SubmitButton from './SubmitButton';

type VisaFormProps<T extends z.ZodType<any, any>> = {
  schema: ZodObject<ZodRawShape>;
  mutationFn: (data: z.infer<T>) => Promise<any>;
  fetchInitDataFn: (userId: string) => Promise<any>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  initData?: (data: Partial<z.infer<T>>) => Partial<z.infer<T>>;
  currentStep?: number;
  children: React.ReactNode;
  userId: string;
};

export function VisaForm<T extends z.ZodType<any, any>>({
  schema,
  mutationFn,
  fetchInitDataFn,
  onSuccess,
  onError,
  currentStep,
  children,
  initData,
  userId,
}: VisaFormProps<T>) {
  const { router, form, userData, defaultData } = useInitForm(schema, fetchInitDataFn, userId);

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  const handleSubmit = (formData: z.infer<T>) => {
    try {
      mutate(formData);
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  // 使用 useResetForm Hook
  useResetForm({
    schema,
    reset: form.reset,
    defaultValues: initData ? initData(defaultData || { userId }) : undefined,
  });

  return (
    <Container className="mt-20">
      {currentStep && <StepProgress currentStep={currentStep} user={userData} />}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {children} <SubmitButton onBack={router.back} isSubmitting={isPending} />
        </form>
      </FormProvider>
    </Container>
  );
}
