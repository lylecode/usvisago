import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const validators = {
  requiredString: z.string({ required_error: '' }).trim().min(1, ''),
  PHONE_REGEX: /^1[3-9]\d{9}$/,
  ID_REGEX: /^[1-9]\d{5}(?:\d{4}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))\d{3}[\dX]$/,
  //requiredDateWithMessage: (message: string) => z.custom<Date>().refine((value) => !!value, { message }),
  requiredDateWithMessage: (message: string) => z.custom<String>().refine((value) => !!value, { message }),

  photoFile: z
    .custom<File>((val) => val instanceof File && val.size > 0, '请上传有效的照片文件')
    .refine((file) => file.size <= MAX_FILE_SIZE, '照片大小不能超过5MB')
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), '只支持 .jpg, .jpeg, .png 格式'),
};
