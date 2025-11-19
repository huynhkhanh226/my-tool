/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";

export default function ImageEditorBox() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!files || files.length === 0) {
      alert("Vui lòng chọn ít nhất một hình ảnh.");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file, idx) => {
      formData.append("images", file);
    });
    formData.append("prompt", prompt);

    // Gửi formData lên server tại đây (ví dụ dùng fetch)
    try {
      const res = await fetch("/api/openai/image-editor", {
        method: "POST",
        body: formData,
      });
      setLoading(false);
      const data = await res.json();
      if (data) {
        setImageUrl(data.url); // Đảm bảo API trả về imageUrl
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-content">
        <div className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl space-y-4"
          >
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Chỉnh sửa hình ảnh
            </h1>
            <div>
              <label className="block mb-2 font-semibold">Chọn hình ảnh</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Mô tả</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                placeholder="Nhập mô tả..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Đang tạo hình ảnh..." : "Tạo ảnh"}
            </button>
          </form>
        </div>
        <div className="flex-1">
          {imageUrl && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-700">
                Kết quả:
              </h2>
              <img
                src={imageUrl}
                alt="AI Generated"
                width={600}
                className="w-full rounded-xl shadow-lg border"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
