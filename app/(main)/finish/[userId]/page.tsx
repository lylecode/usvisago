'use client';
import StepProgress from '@/components/apply-visa/StepProgress';
import Container from '@/components/layout/Container';
import api from '@/lib/ky';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const FinishPage = () => {
  const userId = useParams().userId as string;

  const { data: userData } = useQuery<User | null>({
    queryKey: ['userData', userId],
    queryFn: () => api.get(`/api/visa/term/${userId}`).json<User>(),
    enabled: !!userId,
  });
  return (
    <Container className="mt-20">
      <StepProgress currentStep={8} user={userData} />
      <div className="mt-20 flex w-full flex-col items-center justify-center gap-8 text-center text-lg">
        <div className="h-20 w-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path
              d="M43.171,10.925L24.085,33.446l-9.667-9.015l1.363-1.463l8.134,7.585L41.861,9.378C37.657,4.844,31.656,2,25,2 C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23C48,19.701,46.194,14.818,43.171,10.925z"
              fill="#3B82F6"
            />
          </svg>
        </div>
        <div>
          提交成功，我们会尽快与您联系！<div className="mt-3 text-sm text-gray-500">目前，您仍可修改信息。</div>
        </div>
      </div>
    </Container>
  );
};

export default FinishPage;
