'use client';
import { getFamilyByUserId, getPassportByUserId, getWorkAndEducationByUserId, upsetEvus } from '@/actions/visaAction';
import StepProgress from '@/components/apply-visa/StepProgress';
import SubmitButton from '@/components/apply-visa/SubmitButton';
import Container from '@/components/layout/Container';
import { Form, FormDatePicker, FormInput, FormSelect } from '@/components/ui/form';
import { MARITAL_OPTION, SEX_OPTION } from '@/constants';
import { useCustomForm } from '@/hooks/useCustomForm';
import { schemas, SchemaTypes } from '@/lib/formValidationSchemas';
import api from '@/lib/ky';
import { toFormData } from '@/lib/utils';
import { Family, Passport, User, WorkAndEducation } from '@prisma/client';
import { useMutation, useQueries } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useMemo } from 'react';
type FormData = {
  base: Partial<SchemaTypes['base']>;
  passport: Partial<SchemaTypes['passport']>;
  family: Partial<SchemaTypes['family']>;
  workAndEducation: Partial<SchemaTypes['workAndEducation']>;
};

const InformationPage = () => {
  const userId = useParams<{ userId: string }>().userId;
  const route = useRouter();
  const form = useCustomForm(schemas.evus);

  const [{ data: userData }, { data: passportData }, { data: familyData }, { data: workEduData }] = useQueries({
    queries: [
      {
        queryKey: ['base', userId],
        queryFn: () => api.get(`/api/visa/term/${userId}`).json<User>(),
      },
      {
        queryKey: ['getPassportByUserId', userId],
        queryFn: () => getPassportByUserId(userId),
      },
      {
        queryKey: ['getFamilyByUserId', userId],
        queryFn: () => getFamilyByUserId(userId),
      },
      {
        queryKey: ['getWorkAndEducationByUserId', userId],
        queryFn: () => getWorkAndEducationByUserId(userId),
      },
    ],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SchemaTypes['evus']) => {
      const user = {
        ...data.base,
      } as User;
      const passport = {
        ...data.passport,
        issuedDate: new Date(data.passport.issuedDate.toString()),
        expirationDate: new Date(data.passport.expirationDate.toString()),
      } as Passport;
      const family = {
        ...data.family,
        fatherDate: new Date(data.family.fatherDate.toString()),
        motherDate: new Date(data.family.motherDate.toString()),
        spouseDate: null,
      } as Family;
      const workAndEducation = {
        ...data.workAndEducation,
        startDate: new Date(data.workAndEducation.startDate.toString()),
        eduStartDate: null,
        eduEndDate: null,
      } as WorkAndEducation;

      return upsetEvus(user, passport, family, workAndEducation);
    },
    onSuccess: (response) => {
      console.log(response);
      route.push(`/finish/${response[2].userId}`);
    },
  });

  const formData = useMemo<FormData>(
    () => ({
      base: toFormData(userData, schemas.base),
      passport: toFormData(passportData, schemas.passport),
      family: toFormData(familyData, schemas.family),
      workAndEducation: toFormData(workEduData, schemas.workAndEducation),
    }),
    [userData, passportData, familyData, workEduData],
  );
  useEffect(() => {
    form.reset(formData);
  }, [formData, form]);

  return (
    <Container className="mt-20">
      <StepProgress currentStep={2} title={['注册协议', '基本信息']} user={userData} />
      <h3 className="mt-8 grid grid-cols-3 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold">基本信息</h3>
      <Form form={form} onSubmit={mutate} className="mt-5 flex w-full flex-col gap-6">
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="base.id" hidden />
          <FormInput name="base.otherName" label="曾用名" />
          <FormSelect name="base.sex" label="性别" options={SEX_OPTION} />
          <FormSelect name="base.maritalStatus" label="婚姻状况" options={MARITAL_OPTION} />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="base.birthCountry" label="出生国家" />
          <FormInput name="base.birthProvince" label="出生省份" />
          <FormInput name="base.birthCity" label="出生城市" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="base.idNumber" label="身份证号码" />
          <FormInput name="base.phone" label="手机号码" />
          <FormInput name="base.email" label="电子邮箱" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="base.homeAddress" label="家庭地址" />
          <FormInput name="base.zipCode" label="邮政编码" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="base.socialMedia" label="社交平台" />
          <FormInput name="base.socialAccount" label="社交账号" />
        </div>
        <h3 className="mt-2 grid grid-cols-3 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold">护照信息</h3>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="passport.documentNo" label="护照号码" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="passport.issuedCountry" label="签发国家" />
          <FormInput name="passport.issuedProvince" label="签发省份" />
          <FormInput name="passport.issuedCity" label="签发城市" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormDatePicker name="passport.issuedDate" label="签发日期" />
          <FormDatePicker name="passport.expirationDate" label="到期日期" />
        </div>
        <h3 className="mt-2 grid grid-cols-3 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold">父亲</h3>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="family.fatherName" label="姓名" />
          <FormDatePicker name="family.fatherDate" label="生日" />
        </div>
        <h3 className="mt-2 grid grid-cols-3 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold">母亲</h3>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="family.motherName" label="姓名" />
          <FormDatePicker name="family.motherDate" label="生日" />
        </div>
        <h3 className="mt-2 grid grid-cols-3 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold">
          最近工作情况（在读学生可填学校信息）
        </h3>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="workAndEducation.comName" label="公司名称/学校名称" />
          <FormInput name="workAndEducation.occupation" label="职位/专业" />
          <FormDatePicker name="workAndEducation.startDate" label="开始时间" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="workAndEducation.comCountry" label="所在国家" />
          <FormInput name="workAndEducation.comAddress" label="公司/学校地址" />
          <FormInput name="workAndEducation.comPhone" label="联系电话" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-6">
          <FormInput name="workAndEducation.monthlyIncome" label="月收入（元）" />
        </div>
        <SubmitButton onBack={route.back} isSubmitting={isPending} />
      </Form>
    </Container>
  );
};

export default InformationPage;
