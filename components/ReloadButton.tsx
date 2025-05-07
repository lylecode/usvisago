'use client';
import { useRouter } from 'nextjs-toploader/app';
import Button from './ui/button';

const ReloadButton = () => {
  const router = useRouter();

  return (
    <Button radius="sm" color="primary" variant="bordered" className="mb-4" onPress={() => router.refresh()}>
      刷新数据
    </Button>
  );
};

export default ReloadButton;
