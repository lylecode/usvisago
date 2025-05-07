import { addToast } from "@heroui/react";

export const useToast = () => {
  const toastSuccess = (message: string) =>
    addToast({
      description: message,
      color: "success",
    });

  const toastError = (message: string) =>
    addToast({
      description: message,
      color: "danger",
    });

  return { toastSuccess, toastError };
};
