'use client';

import { getTravelByUserId, upsetTravel } from '@/actions/visaAction';
import StepProgress from '@/components/apply-visa/StepProgress';
import SubmitButton from '@/components/apply-visa/SubmitButton';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/button';
import { Form, FormDatePicker, FormInput } from '@/components/ui/form';
import { randomTravel } from '@/constants/travel';
import { useCustomForm } from '@/hooks/useCustomForm';
import { schemas, SchemaTypes } from '@/lib/formValidationSchemas';
import api from '@/lib/ky';
import { Travel, User } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';

const TravelPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const form = useCustomForm(schemas.travel);

  const { data: userData } = useQuery({
    queryKey: ['userData', userId],
    queryFn: () => api.get(`/api/visa/term/${userId}`).json<User>(),
  });
  const { data: travelData } = useQuery({
    queryKey: ['travelData', userId],
    queryFn: () => getTravelByUserId(userId),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SchemaTypes['travel']) => {
      const serializedData = {
        ...data,
        arrivalDate: new Date(data.arrivalDate.toString()),
        departureDate: new Date(data.departureDate.toString()),
      };
      return upsetTravel(serializedData as Travel);
    },
  });

  const handleSubmit = (formData: SchemaTypes['travel']) => {
    try {
      mutate(formData, { onSuccess: () => router.push(`/family/${userId}`) });
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const generateRandomData = () => {
    const randomIndex = Math.floor(Math.random() * 50); // 0-49
    const data = randomTravel[randomIndex];
    const formattedData = {
      userId,
      ...data,
      arrivalDate: format(data.arrivalDate, 'yyyy-MM-dd'),
      departureDate: format(data.departureDate, 'yyyy-MM-dd'),
    };
    form.reset(formattedData);
  };

  useEffect(() => {
    form.reset({
      userId,
      ...Object.fromEntries(
        Object.keys(schemas.travel.shape)
          .filter((key) => key !== 'userId')
          .map((key) => {
            const value = travelData && key in travelData ? travelData[key as keyof Travel] : '';
            if (value instanceof Date) {
              return [key, format(value, 'yyyy-MM-dd')];
            }
            return [key, value || ''];
          }),
      ),
    });
  }, [form, userId, travelData]);

  return (
    <Container className="mt-20">
      <StepProgress currentStep={4} user={userData} />

      <Button color="primary" className="mt-5" variant="bordered" onPress={generateRandomData}>
        生成随机示例
      </Button>

      <Form form={form} onSubmit={handleSubmit}>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormDatePicker name="arrivalDate" label="到达美国时间" />
          <FormInput name="arrivalCity" label="到达城市" />
          <FormInput name="arrivalFlight" label="到达航班号" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormDatePicker name="departureDate" label="离开美国时间" />
          <FormInput name="departureCity" label="离开城市" />
          <FormInput name="departureFlight" label="离开航班号" />
        </div>

        <div className="mt-8">
          <FormInput name="locations" label="前往美国哪些城市" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput name="address" label="美国地址" />
          <FormInput name="province" label="所在州" />
          <FormInput name="city" label="城市" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput name="zipCode" label="邮编" />
          <FormInput name="phone" label="电话" />
        </div>

        <SubmitButton onBack={router.back} isSubmitting={isPending} />
      </Form>
    </Container>
  );
};

export default TravelPage;
