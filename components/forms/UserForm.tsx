"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";

import { UserFormSchema, UserFormType } from "@/components/schemas/user.schema";
import { useState } from "react";

export default function UserForm() {
  const [submitted, setSubmitted] = useState<UserFormType | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormType>({
    resolver: zodResolver(UserFormSchema),
    mode: "onChange",
  });

  // 👇 TypeScript sẽ tự kiểm soát type của 'data'
  const onSubmit = async (data: UserFormType) => {
    // mô phỏng gọi API
    await new Promise((r) => setTimeout(r, 700));

    setSubmitted(data);
    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold">User Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Tên"
          placeholder="Nhập tên..."
          {...register("name")}
          error={errors.name}
        />

        <InputField
          label="Email"
          placeholder="Nhập email..."
          {...register("email")}
          error={errors.email}
        />

        <InputField
          label="Tuổi"
          type="number"
          placeholder="Ví dụ: 25"
          {...register("age")}
          error={errors.age}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi form"}
        </button>
      </form>

      {submitted && (
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-medium mb-1">Dữ liệu đã gửi:</h3>
          <pre className="text-sm">{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
