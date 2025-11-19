/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useChat, useCompletion } from "@ai-sdk/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeSanitize from "rehype-sanitize";

export default function ChatImageBox() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/openai/image-generator", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      console.log("data", data);
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
      <main className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Tạo hình ảnh AI
          </h1>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Nhập mô tả (prompt) ví dụ: a cat astronaut on Mars"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleGenerateImage}
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Đang tạo hình ảnh..." : "Tạo ảnh"}
            </button>
          </div>

          {imageUrl && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-700">
                Kết quả:
              </h2>
              <img
                src={imageUrl}
                alt="AI Generated"
                className="w-full rounded-xl shadow-lg border"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
