'use client';
import { getPassportByUserId, getUserByUserId, upsetPassport } from '@/actions/visaAction';
import StepProgress from '@/components/apply-visa/StepProgress';
import SubmitButton from '@/components/apply-visa/SubmitButton';
import Container from '@/components/layout/Container';
import { Form, FormDatePicker, FormInput } from '@/components/ui/form';
import { useCustomForm } from '@/hooks/useCustomForm';
import { schemas, SchemaTypes } from '@/lib/formValidationSchemas';
import { Passport } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';

const PassportPage = () => {
  const route = useRouter();
  const userId = useParams<{ userId: string }>().userId;

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserByUserId(userId),
  });
  const { data: passportData } = useQuery({
    queryKey: ['passport', userId],
    queryFn: () => getPassportByUserId(userId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SchemaTypes['passport']) => {
      console.log('data', data);
      const serializedData = {
        ...data,
        expirationDate: new Date(data.expirationDate.toString()),
        issuedDate: new Date(data.issuedDate.toString()),
      };
      return upsetPassport(serializedData as Passport);
    },
  });

  const form = useCustomForm(schemas.passport);

  const onSubmit = async (data: SchemaTypes['passport']) => {
    try {
      mutate(data, { onSuccess: (response) => route.push(`/travel/${userId}`) });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    form.reset({
      userId,
      ...Object.fromEntries(
        Object.keys(schemas.passport.shape)
          .filter((key) => key !== 'userId')
          .map((key) => {
            const value = passportData && key in passportData ? passportData[key as keyof Passport] : '';
            if (value instanceof Date) {
              return [key, format(value, 'yyyy-MM-dd')];
            }
            return [key, value || ''];
          }),
      ),
    });
  }, [passportData, form, userId]);

  return (
    <Container className="mt-20">
      {!isUserLoading ? <StepProgress currentStep={3} user={userData!} /> : <div></div>}
      <Form className="mt-6 flex w-full flex-col gap-6" onSubmit={onSubmit} form={form}>
        <div className="mt-2 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput name="documentNo" label="护照号码" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput name="issuedCountry" label="签发国家" />
          <FormInput name="issuedProvince" label="签发省份" />
          <FormInput name="issuedCity" label="签发城市" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormDatePicker name="issuedDate" label="签发日期" />
          <FormDatePicker name="expirationDate" label="到期日期" />
        </div>

        <SubmitButton onBack={route.back} isSubmitting={isPending} />
      </Form>
    </Container>
  );
};

export default PassportPage;
