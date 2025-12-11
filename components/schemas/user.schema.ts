import { z } from "zod";

export const UserFormSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự").max(50, "Tên quá dài"),
  email: z.string().email("Email không hợp lệ"),
  age: z.string().min(1, "Tuổi phải >= 1"),
});

export type UserFormType = z.infer<typeof UserFormSchema>;
