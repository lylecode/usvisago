import { InputProps } from "@heroui/react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

export interface FormProps {
  register: UseFormRegisterReturn;
  errors: FieldErrors<any>;
  hidden?: boolean;
}
