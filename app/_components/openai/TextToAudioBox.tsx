/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useChat, useCompletion } from "@ai-sdk/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeSanitize from "rehype-sanitize";

export default function TextToAudioBox() {
  const [prompt, setPrompt] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/openai/audio-generator", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const base64 = data.base64;

      // Giải mã base64 thành ArrayBuffer
      const binary = atob(base64);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      // Tạo blob và phát
      const blob = new Blob([bytes], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      debugger;
      console.log("data", data);
      setDownloadUrl(url);
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
            Chuyển văn bản thành Audio (mp3)
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
              {loading ? "Đang tạo âm thanh..." : "Tạo âm thanh"}
            </button>
          </div>

          {downloadUrl && (
            <>
              <audio controls src={downloadUrl} />
              <a
                href={downloadUrl}
                download="speech.mp3"
                className="text-blue-600 underline"
              >
                Tải file âm thanh
              </a>
            </>
          )}
        </div>
      </main>
    </>
  );
}
