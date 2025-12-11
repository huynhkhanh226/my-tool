"use client";

import { useForm, useWatch } from "react-hook-form";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import axios from "axios";

type FormValues = {
  keyword: string;
  category: string;
};

export default function SearchForm() {
  const { control, register } = useForm<FormValues>({
    defaultValues: {
      keyword: "",
      category: "",
    },
  });

  // ✅ Không dùng watch() → dùng useWatch (chuẩn & tối ưu)
  const keyword: string = useWatch({ control, name: "keyword" });
  const category: string = useWatch({ control, name: "category" });

  const query: FormValues = { keyword, category };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, loading } = useDebouncedSearch<FormValues, any>(
    query,
    (q: FormValues, signal: AbortSignal) => {
      return axios.get("/api/search", {
        params: q,
        signal,
      });
    },
    400,
  );

  console.log("render nè");
  return (
    <div className="space-y-4 p-4">
      <input {...register("keyword")} placeholder="Keyword…" className="border p-2 w-full" />

      <input {...register("category")} placeholder="Category…" className="border p-2 w-full" />

      {loading && <p>Đang tìm…</p>}

      {data && <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
