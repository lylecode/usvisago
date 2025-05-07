'use client';

import { getFamilyByUserId, upsetFamily } from '@/actions/visaAction';
import { VisaForm } from '@/components/apply-visa/VisaForm';
import { FormDatePicker, FormInput } from '@/components/ui/form';
import { schemas } from '@/lib/formValidationSchemas';
import { toHerouiDate } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

const FamilyPage = () => {
  const router = useRouter();
  const userId = useParams().userId as string;
  const getInitData = (defaultData: { fatherDate?: Date; motherDate?: Date; spouseDate?: Date }) => ({
    ...defaultData,
    fatherDate: defaultData && toHerouiDate(defaultData.fatherDate!!),
    motherDate: defaultData && toHerouiDate(defaultData.motherDate!!),
    spouseDate: defaultData && toHerouiDate(defaultData.spouseDate!!),
  });

  return (
    <VisaForm
      userId={userId}
      schema={schemas.family}
      fetchInitDataFn={getFamilyByUserId}
      mutationFn={(data) =>
        upsetFamily({
          ...data,
          fatherDate: new Date(data.fatherDate.toString()),
          motherDate: new Date(data.motherDate.toString()),
          spouseDate: data.spouseDate ? new Date(data.spouseDate.toString()) : null,
        })
      }
      initData={(defaultData) => getInitData(defaultData)}
      onSuccess={(data) => router.push(`/work/${data.userId}`)}
      currentStep={5}>
      <h3 className="mt-8 grid grid-cols-2 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold md:grid-cols-3">
        父亲
      </h3>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormInput name="fatherName" label="姓名" />
        <FormDatePicker name="fatherDate" label="生日" />
      </div>
      <h3 className="mt-8 grid grid-cols-2 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold md:grid-cols-3">
        母亲
      </h3>

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormInput name="motherName" label="姓名" />
        <FormDatePicker name="motherDate" label="生日" />
      </div>
      <h3 className="mt-8 grid grid-cols-2 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold md:grid-cols-3">
        配偶（未婚可忽略）
      </h3>

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormInput name="spouseName" label="姓名" />
        <FormDatePicker name="spouseDate" label="生日" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormInput name="spouseProvince" label="出生省份" /> <FormInput name="spouseCity" label="出生城市" />
        <FormInput name="spouseAddress" label="现住址" />
      </div>
    </VisaForm>
  );
};

export default FamilyPage;
