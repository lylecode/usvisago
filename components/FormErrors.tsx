interface FormErrorsProps {
  errors: Record<string, { message?: string } | undefined>;
}

const FormErrors = ({ errors }: FormErrorsProps) => (
  <div className="mb-4 text-red-500">
    {Object.entries(errors).map(([field, error]) => {
      const errorMessage = error && typeof error === 'object' && 'message' in error ? error.message : 'Invalid field';

      return (
        <div key={field}>
          {field}: {errorMessage}
        </div>
      );
    })}
  </div>
);

export default FormErrors;
