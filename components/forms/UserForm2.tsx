"use client";

import { useActionState } from "react";
import { createUser } from "@/action/createUser";

export default function UserForm2() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });

  console.log("state", state);
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block mb-1">Tên</label>
        <input name="name" className="w-full p-2 border rounded" placeholder="Nhập tên" />
        {state.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input name="email" className="w-full p-2 border rounded" placeholder="Nhập email" />
        {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
      </div>

      <div>
        <label className="block mb-1">Tuổi</label>
        <input name="age" type="number" className="w-full p-2 border rounded" />
        {state.errors?.age && <p className="text-red-500 text-sm">{state.errors.age}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Tạo User
      </button>

      {state.success && <p className="text-green-600 font-semibold">{state.message}</p>}
    </form>
  );
}
