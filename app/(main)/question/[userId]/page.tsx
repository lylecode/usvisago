'use client';
import { getQuestionByUserId, upsetQuestion } from '@/actions/visaAction';
import StepProgress from '@/components/apply-visa/StepProgress';
import SubmitButton from '@/components/apply-visa/SubmitButton';
import Container from '@/components/layout/Container';
import { Form, FormCheckbox, FormInput } from '@/components/ui/form';
import { question } from '@/constants';
import { useCustomForm } from '@/hooks/useCustomForm';
import { questionSchema, QuestionSchemaFields } from '@/lib/formValidationSchemas';
import api from '@/lib/ky';
import Toast from '@/lib/toast';
import { Question, User } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useMemo, useState } from 'react';

const QuestionPage = () => {
  const userId = useParams().userId as string;
  const router = useRouter();
  const form = useCustomForm(questionSchema);

  const { data: userData } = useQuery<User | null>({
    queryKey: ['userData', userId],
    queryFn: () => api.get(`/api/visa/term/${userId}`).json<User>(),
    enabled: !!userId,
  });
  const { data: questionData } = useQuery<Question[]>({
    queryKey: ['questionData', userId],
    queryFn: () => getQuestionByUserId(userId),
    enabled: !!userId,
    initialData: [],
  });

  const allQuestions = useMemo(() => {
    return question.flatMap((group) => group.items);
  }, []);

  const initialStates = useMemo(
    () => ({
      checkbox: Object.fromEntries(allQuestions.map((q) => [q.key, false])),
      describe: Object.fromEntries(allQuestions.map((q) => [q.key, ''])),
    }),
    [],
  );

  const [checkboxStates, setCheckboxStates] = useState(initialStates.checkbox);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCheckboxStates((prev) => ({ ...prev, [key]: checked }));
    form.setValue(`questionIndex.${key}`, checked);
    if (!checked) {
      form.setValue(`describe.${key}`, '');
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: QuestionSchemaFields) => {
      const questions = Object.entries(data.questionIndex)
        .filter(([_, value]) => value === true)
        .map(([key]) => ({
          questionIndex: key,
          describe: data.describe[key] || '',
        }));
      return upsetQuestion(userId, questions);
    },
    onSuccess: () => {
      //Toast.success('保存成功！');
      router.push(`/finish/${userId}`);
    },
    onError: (error) => {
      Toast.error(`Failed to save questions: ${error.message}`);
    },
  });

  useEffect(() => {
    const checkboxStates = { ...initialStates.checkbox };
    const describeStates = { ...initialStates.describe };

    if (questionData) {
      questionData.forEach((q) => {
        if (allQuestions.some((q2) => q2.key === q.questionIndex)) {
          checkboxStates[q.questionIndex] = true;
          describeStates[q.questionIndex] = q.describe;
        }
      });
    }

    setCheckboxStates(checkboxStates);
    form.reset({
      userId,
      questionIndex: checkboxStates,
      describe: describeStates,
    });
  }, [form, userId, questionData]);

  return (
    <Container className="mt-20">
      <StepProgress currentStep={7} user={userData} />
      <div className="mt-8">
        <Form form={form} onSubmit={mutate}>
          {question.map((group) => (
            <div key={group.title}>
              <h3 className="mt-8 grid grid-cols-3 gap-6 border-b-1 border-b-neutral-200 py-3 font-bold">
                {group.title}
              </h3>
              {group.items.map((question) => (
                <div key={question.key} className="py-4">
                  <FormCheckbox
                    name={`questionIndex.${question.key.toString()}`}
                    className="align-top"
                    classNames={{
                      base: '!items-start',
                      label: 'ml-2 text-base  mt-[-3] ',
                    }}
                    onChange={(e) => handleCheckboxChange(question.key.toString(), e.target.checked)}>
                    <div>{question.label}</div>
                  </FormCheckbox>
                  {checkboxStates[question.key] && (
                    <div className="pl-8">
                      <FormInput
                        name={`describe.${question.key.toString()}`}
                        label="请说明情况"
                        className="my-3 mr-10"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          <SubmitButton onBack={router.back} isSubmitting={isPending} />
        </Form>
      </div>
    </Container>
  );
};

export default QuestionPage;
