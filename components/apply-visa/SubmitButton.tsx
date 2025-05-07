import Button from '../ui/button';

interface SubmitButtonProps {
  onBack?: () => void;
  backBtnDisabled?: boolean;
  isSubmitting?: boolean;
}
const SubmitButton = ({ onBack, backBtnDisabled = false, isSubmitting = false }: SubmitButtonProps) => {
  return (
    <div className="mt-10 flex flex-row justify-start gap-10">
      <Button
        onPress={onBack}
        size="lg"
        disabled={backBtnDisabled}
        className="disabled:cursor-not-allowed disabled:opacity-50">
        上一步
      </Button>
      <Button
        color="primary"
        size="lg"
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="disabled:cursor-not-allowed disabled:opacity-50 md:w-1/5">
        <span className={`transition ${isSubmitting ? 'opacity-30' : 'opacity-100'}`}>
          {isSubmitting ? '保存中...' : '下一步'}
        </span>
      </Button>
    </div>
  );
};

export default SubmitButton;
