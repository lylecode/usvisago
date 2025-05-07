'use client';
import PhotoImage from '@/components/apply-visa/PhotoImage';
import StepProgress from '@/components/apply-visa/StepProgress';
import SubmitButton from '@/components/apply-visa/SubmitButton';
import Container from '@/components/layout/Container';
import { Form, FormInput, FormSelect } from '@/components/ui/form';
import { MARITAL_OPTION, SEX_OPTION } from '@/constants';
import { useCustomForm } from '@/hooks/useCustomForm';
import { schemas, SchemaTypes } from '@/lib/formValidationSchemas';
import api from '@/lib/ky';
import { User } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useRef, useState } from 'react';

const BasePage = () => {
  const userId = useParams<{ userId: string }>().userId;
  const route = useRouter();
  const form = useCustomForm(schemas.base);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Track preview URL separately
  const { data } = useQuery({
    queryKey: ['base', userId],
    queryFn: () => api.get(`/api/visa/term/${userId}`).json<User>(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SchemaTypes['base']) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      });

      return api.post('/api/visa/base', { body: formData }).json<User>();
    },
  });
  useEffect(() => {
    const initForm = async () => {
      if (data) {
        const formData = Object.fromEntries(
          Object.keys(schemas.base.shape).map((key) => {
            const value = data[key as keyof User];
            if (key.endsWith('Date') && value) {
              if (typeof value === 'string') {
                return [key, new Date(value).toLocaleDateString('zh-CN')];
              } else if (value instanceof Date) {
                return [key, value.toLocaleDateString('zh-CN')];
              }
            }
            return [key, value || ''];
          }),
        );

        form.reset(formData);

        if (data.photoImage) {
          const mimeType = data.photoImage.endsWith('.png') ? 'image/png' : 'image/jpeg';
          const res = await fetch(`/uploads/${data.photoImage}`);
          const blob = await res.blob();
          const file = new File([blob], data.photoImage!, { type: mimeType });
          form.setValue('photoImage', file, { shouldValidate: false });
          setPreviewUrl(URL.createObjectURL(file));
        }
      }
    };

    initForm();
  }, [data, form]);

  const onSubmit = (data: SchemaTypes['base']) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        route.push(`/passport/${response.id}`);
      },
    });
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      form.setValue('photoImage', e.target.files[0], { shouldValidate: true });
      const isValid = await form.trigger('photoImage');
      if (isValid && !form.formState.errors.photoImage) setPreviewUrl(URL.createObjectURL(e.target.files[0])); // Update preview URL
    }
  };
  return (
    <Container className="mt-20">
      <StepProgress currentStep={2} user={data} />
      <Form form={form} onSubmit={onSubmit} className="mt-5 flex w-full flex-col gap-6">
        <div className="mt-2 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput name="id" hidden />
          <FormInput name="otherName" label="曾用名" />
          <FormSelect name="sex" label="性别" options={SEX_OPTION} />
          <FormSelect name="maritalStatus" label="婚姻状况" options={MARITAL_OPTION} />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput name="birthCountry" label="出生国家" />
          <FormInput name="birthProvince" label="出生省份" />
          <FormInput name="birthCity" label="出生城市" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput name="idNumber" label="身份证号码" />
          <FormInput name="phone" label="手机号码" />
          <FormInput name="email" label="电子邮箱" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput name="homeAddress" label="家庭地址" />
          <FormInput name="zipCode" label="邮政编码" />
          <FormSelect
            name="location"
            label="选择面谈使馆"
            options={[
              { key: 'wuhan', label: '武汉' },
              { key: 'beijing', label: '北京' },
              { key: 'shanghai', label: '上海' },
            ]}></FormSelect>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput name="socialMedia" label="社交平台" />
          <FormInput name="socialAccount" label="社交账号" />
        </div>
        <div className="mt-2 hidden grid-cols-2 gap-6 md:grid-cols-3">
          <FormInput label="签证照片" name="photoImage" type="file" onChange={handleFileChange} ref={fileInputRef} />
        </div>
        <div className="mt-2 flex flex-row gap-8 text-center">
          <div className="relative flex h-24 w-24 flex-col justify-end bg-gray-100">
            <PhotoImage previewUrl={previewUrl} />
          </div>
          <div className="text-left text-sm">
            <ul className="relative h-full gap-4">
              <li>近六个月内照片</li>
              <li>背景为白色</li>
              <li>尺寸为51CM*51CM</li>
              <li>
                <a
                  href="#"
                  className="absolute bottom-0 text-base font-bold underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}>
                  上传美签照片
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-red-500">{form.formState.errors.photoImage?.message}</div>

        <SubmitButton onBack={route.back} isSubmitting={isPending} />
      </Form>
    </Container>
  );
};

export default BasePage;
