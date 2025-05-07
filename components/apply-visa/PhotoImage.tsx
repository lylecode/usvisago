import Image from 'next/image';

const PhotoImage = ({ previewUrl }: { previewUrl: string | null }) => {
  return (
    <>
      {previewUrl ? (
        <Image src={previewUrl} alt="Photo Image" fill className="rounded object-cover" sizes="96px" />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded bg-gray-200">
          <span className="text-sm text-gray-500">无照片</span>
        </div>
      )}
    </>
  );
};

export default PhotoImage;
