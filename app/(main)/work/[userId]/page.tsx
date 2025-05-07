'use client';

import { getWorkAndEducationByUserId, upsetWorkAndEducation } from '@/actions/visaAction';
import { VisaForm } from '@/components/apply-visa/VisaForm';
import { FormDatePicker, FormInput } from '@/components/ui/form';
import { schemas } from '@/lib/formValidationSchemas';
import { toHerouiDate } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';

const WorkPage = () => {
  const router = useRouter();
  const userId = useParams().userId as string;
  const getInitData = (defaultData: {
    comCountry?: string;
    eduCountry?: string;

    startDate?: Date;
    eduStartDate?: Date;
    eduEndDate?: Date;
  }) => ({
    ...defaultData,
    startDate: toHerouiDate(defaultData?.startDate),
    eduStartDate: toHerouiDate(defaultData?.eduStartDate),
    eduEndDate: toHerouiDate(defaultData?.eduEndDate),
    comCountry: defaultData.comCountry ?? '中国',
  });

  return (
    <VisaForm
      userId={userId}
      schema={schemas.workAndEducation}
      fetchInitDataFn={getWorkAndEducationByUserId}
      mutationFn={(data) =>
        upsetWorkAndEducation({
          ...data,
          startDate: new Date(data.startDate.toString()),
          eduStartDate: new Date(data.eduStartDate.toString()),
          eduEndDate: data.eduEndDate ? new Date(data.eduEndDate.toString()) : null,
        })
      }
      initData={(defaultData) => getInitData(defaultData)}
      onSuccess={(data) => router.push(`/question/${data.userId}`)}
      currentStep={6}>
      <h3 className="mt-8 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold">
        最近工作情况（在读学生可填学校信息）
      </h3>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormInput name="comName" label="公司名称/学校名称" />
        <FormInput name="occupation" label="职位/专业" />
        <FormDatePicker name="startDate" label="开始时间" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormInput name="comCountry" label="所在国家" />
        <FormInput name="comAddress" label="公司/学校地址" />
        <FormInput name="comPhone" label="联系电话" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormInput name="monthlyIncome" label="月收入（元）" />
      </div>
      <h3 className="mt-8 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold">高中以上学历（没有可忽略）</h3>

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormInput name="eduName" label="学校名称" />
        <FormInput name="eduCourse" label="专业名称" />
        <FormDatePicker name="eduStartDate" label="入学时间" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormDatePicker name="eduEndDate" label="毕业时间" />
        <FormInput name="eduCountry" label="所在国家" />
        <FormInput name="eduAddress" label="学校地址" />
      </div>
    </VisaForm>
  );
};

export default WorkPage;
