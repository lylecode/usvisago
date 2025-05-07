// components/ui/Form.tsx
'use client';
import { cn, toHerouiDate } from '@/lib/utils';
import {
  Checkbox,
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  Input,
  InputProps,
  Select,
  SelectItem,
  SelectProps,
} from '@heroui/react';
import * as React from 'react';
import { Controller, FieldValues, FormProvider, useFormContext, UseFormReturn } from 'react-hook-form';

type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  children: React.ReactNode;
  onSubmit?: (data: TFieldValues) => void;
  className?: string;
};

export const Form = <TFieldValues extends FieldValues>({
  form,
  children,
  onSubmit,
  className,
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined} className={cn(className)}>
        {children}
      </form>
    </FormProvider>
  );
};

interface FormFieldProps {
  hidden?: boolean;
  name: string;
}

export type FormInputProps = InputProps & FormFieldProps;

// FormInput 组件
export const FormInput = ({ name, hidden, ...inputProps }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        hidden ? (
          <input type="hidden" id={name} {...field} value={field.value ?? ''} />
        ) : inputProps?.type === 'file' ? (
          <Input
            id={name}
            type="file"
            onChange={(e) => field.onChange(e.target.files?.[0])} // Update form state with File
            {...inputProps}
            radius="sm"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        ) : (
          <Input
            id={name}
            {...field}
            {...inputProps}
            radius="sm"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )
      }
    />
  );
};

export type FormCheckboxProps = CheckboxProps & FormFieldProps;

// FormCheckbox 组件
export const FormCheckbox = ({ name, hidden, ...inputProps }: FormCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          id={name}
          {...field}
          {...inputProps}
          isSelected={field.value}
          radius="sm"
          isInvalid={fieldState.invalid}
        />
      )}
    />
  );
};
// FormSelect 组件
export type FormSelectProps = Omit<SelectProps, 'children'> &
  FormFieldProps & {
    readonly options: readonly { key: string; label: string }[];
  };

export const FormSelect = ({ name, options, ...selectProps }: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <div className="space-y-1">
            <Select
              id={name}
              {...field}
              {...selectProps}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              onSelectionChange={(keys) => field.onChange(keys instanceof Set ? Array.from(keys)[0] : keys)}
              selectedKeys={field.value ? [field.value] : []}>
              {options.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        );
      }}
    />
  );
};

// DatePicker 组件
export type FormDatePickerProps = DatePickerProps & FormFieldProps;

export const FormDatePicker = ({ name, ...datePickerProps }: FormDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const fieldValue = field.value
          ? typeof field.value === 'string'
            ? toHerouiDate(new Date(field.value))
            : field.value
          : null;

        return (
          <DatePicker
            {...datePickerProps}
            value={fieldValue}
            onChange={field.onChange}
            maxValue={toHerouiDate(new Date())}
            showMonthAndYearPickers={true}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            granularity="day"
          />
        );
      }}
    />
  );
};
