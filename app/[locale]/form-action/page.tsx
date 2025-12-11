"use client";

// Client component + zod + react-hook-form + (api)
// Client component + zod + react-hook-form + (action)
// Client component + zod + useActionState + (action/api)

// Client → validate Zod → Server Action → validate lại Zod → DB
// Client → validate Zod → call /api/... → API Route → validate lại Zod → DB

// API Route vẫn bảo mật hơn, vì:

// Cho phép middleware (rate limit, IP block, CSRF…)

// Cho phép auth linh hoạt (JWT, OAuth, cookie…)

// Cho phép implement các lớp bảo vệ HTTP

// Dễ audit

// Làm việc tốt với nhiều client (mobile, backend khác)

// Không bị rủi ro serialize nhầm chính Next.js

// Server Action bảo mật tốt, nhưng:

// Phụ thuộc vào cơ chế serialize/deserialize của Next.js

// Không phù hợp cho nhiều client

// Không dễ audit log

// Không dễ implement security layer nâng cao

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema, UserFormType } from "@/components/schemas/user.schema";
import { createUserAction2 } from "@/action/createUser";
import { useState } from "react";

export default function UserFormPage() {
  const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null);

  const form = useForm<UserFormType>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: UserFormType) => {
    setServerErrors(null);

    // const formData = new FormData();
    // formData.append("name", values.name);
    // formData.append("email", values.email);
    // formData.append("age", values.age.toString());
    // const result = await createUserAction(formData);

    const result = await createUserAction2(values);

    if (!result.success) {
      setServerErrors(result.errors!);
      return;
    }

    alert("Tạo user thành công!");
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input className="border p-2 w-full rounded" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          {serverErrors?.name && <p className="text-red-500 text-sm">{serverErrors.name[0]}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input className="border p-2 w-full rounded" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          {serverErrors?.email && <p className="text-red-500 text-sm">{serverErrors.email[0]}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1">Age</label>
          <input type="number" className="border p-2 w-full rounded" {...register("age")} />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          {serverErrors?.age && <p className="text-red-500 text-sm">{serverErrors.age[0]}</p>}
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {isSubmitting ? "Waiting.." : "Submit"}
        </button>
      </form>
    </div>
  );
}
