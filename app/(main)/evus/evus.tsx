'use client';
import StepProgress from '@/components/apply-visa/StepProgress';
import SubmitButton from '@/components/apply-visa/SubmitButton';
import Container from '@/components/layout/Container';
import { Form, FormDatePicker, FormInput } from '@/components/ui/form';
import { termData } from '@/constants';
import { useCustomForm } from '@/hooks/useCustomForm';
import { schemas, SchemaTypes } from '@/lib/formValidationSchemas';
import api from '@/lib/ky';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';

const Evus = () => {
  const router = useRouter();

  const form = useCustomForm(schemas.term, {
    action: 'EVUS',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SchemaTypes['term']) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value as string);
        }
      });

      return api.post('/api/visa/term', { body: formData }).json<User>();
    },
    onSuccess: (response) => router.push(`/information/${response.id}`),
  });

  useEffect(() => {}, []);
  return (
    <Container className="mt-20">
      <StepProgress currentStep={1} title={['注册协议', '基本信息']} />
      <div className="py-16">
        <h1 className="mb-10 text-center text-2xl font-bold">用户使用协议</h1>
        <p className="mb-6 leading-relaxed text-gray-700">
          欢迎使用美国签证代理服务（以下简称“本服务”）。在您注册并使用本服务之前，请仔细阅读以下条款。一旦您完成注册并提交相关资料，即表示您已充分理解并同意遵守本协议的所有内容。
        </p>

        {termData.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">{`${index + 1}. ${section.title}`}</h2>
            <p className="text-gray-600">{section.text}</p>
          </section>
        ))}

        <Form form={form} onSubmit={mutate} className="mt-14 flex w-full flex-col gap-6">
          <div className="grid w-full grid-cols-2 gap-9 md:grid-cols-3">
            <FormInput label="申请人姓名" name="realName" />
            <FormDatePicker name="birthDate" label="出生日期" />
          </div>

          <SubmitButton backBtnDisabled isSubmitting={isPending} />
        </Form>
      </div>
    </Container>
  );
};

export default Evus;
