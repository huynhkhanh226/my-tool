"use client";

import { FieldError } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export default function InputField({ label, error, ...props }: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block font-medium">{label}</label>

      <input
        {...props}
        className={`border rounded w-full p-2 ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
