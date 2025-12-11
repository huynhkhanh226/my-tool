"use server";

import { UserFormSchema, UserFormType } from "@/components/schemas/user.schema";

export async function createUserAction(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    age: formData.get("age"),
  };

  // validate bằng Zod ở server-side
  const parsed = UserFormSchema.safeParse(raw);
  console.log("raw", raw);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  // Fake lưu DB
  console.log("Save to DB:", data);

  return { success: true };
}

export async function createUserAction2(raw: UserFormType) {
  // validate bằng Zod ở server-side
  const parsed = UserFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  // Fake lưu DB
  console.log("Save to DB:", data);

  return { success: true };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    age: formData.get("age"),
  };

  const parsed = UserFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Fake saving to database
  console.log("Saving user:", parsed.data);

  return {
    success: true,
    message: "Tạo user thành công!",
  };
}
