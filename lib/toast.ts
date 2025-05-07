import { addToast } from '@heroui/react';

const classNames = {
  base: 'rounded-sm bg-blue-500 shadow-lg shadow-red-500',
  content: 'text-white',
  title: 'text-white',
  description: 'text-white',
  closeButton: 'bg-white text-blue-500 hover:bg-gray-100',
};
const Toast = {
  success: (message: string) =>
    addToast({
      description: message,
      color: 'primary',
      classNames: classNames,
    }),
  error: (message: string) => addToast({ description: message, color: 'danger' }),
};
export const useToast = () => Toast;

export default Toast;
