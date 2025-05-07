'use client';
import { User } from '@prisma/client';
import { IoIosWarning } from 'react-icons/io';
import PhotoImage from './PhotoImage';
interface Props {
  user?: User | null | undefined;
  title?: string[]; // 修正为字符串数组
  currentStep: number; // 从 1 开始计数
}
const StepProgress = ({
  user,
  title = ['注册协议', '基本信息', '护照信息', '旅行计划', '家属信息', '工作教育', '问答选择'],
  currentStep,
}: Props) => {
  let birthDate = '';
  if (user) {
    if ('string' === typeof user?.birthDate) {
      birthDate = new Date(user!.birthDate).toLocaleDateString('zh-CN');
    } else {
      birthDate = user!.birthDate.toLocaleDateString('zh-CN');
    }
  }
  return (
    <>
      <div className="relative mb-10 flex pr-12">
        {title.map((stepTitle, index) => (
          <div key={index} className="flex w-full items-center">
            <div className="flex w-full flex-col">
              <div className="mb-2 ml-5 flex w-full flex-row items-center">
                <div
                  className={`z-10 mx-[-1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                    currentStep > index ? 'bg-blue-500' : 'bg-blue-200'
                  }`}>
                  <span className="text-sm font-semibold text-white"></span>
                </div>
                <div
                  className={`relative h-2 w-full overflow-hidden bg-blue-100 before:absolute before:left-0 before:top-0 before:h-full before:bg-blue-500 before:transition-all before:duration-300 before:ease-in-out before:content-[''] ${
                    currentStep > index + 1 ? 'before:w-full' : 'before:w-0'
                  }`}></div>
              </div>
              <div className={`text-sm ${currentStep - 1 === index ? 'text-neutral-800' : 'text-neutral-400'} `}>
                {stepTitle}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute right-0 flex items-center">
          <div>
            <div className="mb-2 flex flex-col">
              <div
                className={`ml-4 flex h-4 w-4 shrink-0 rounded-full ${currentStep === 8 ? 'bg-blue-500' : 'bg-blue-200'} `}></div>
            </div>
            <div className={`text-sm ${currentStep === 8 ? 'text-neutral-800' : 'text-neutral-400'}`}>提交完成</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b pb-6">
        {currentStep === 1 && (
          <h3 className={`flex w-full items-center gap-1 text-rose-500`}>
            <IoIosWarning className="h-5 w-5" />
            在填表过程中或完成后，随时可以通过姓名和出生日期调出申请用于继续填写或者查看状态。
          </h3>
        )}

        {currentStep !== 1 && (
          <div className="itb flex flex-row items-start gap-6">
            <div className={`relative flex h-14 w-14 flex-col justify-end ${user?.photoImage ? `` : `hidden`} `}>
              <PhotoImage previewUrl={user?.photoImage ? `/uploads/${user?.photoImage}` : ''} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold">{user?.realName}</h3>
              <h3 className="">{birthDate}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StepProgress;
