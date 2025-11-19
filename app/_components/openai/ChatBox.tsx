/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeSanitize from "rehype-sanitize";

export default function ChatBox() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai/chat-completions",
  });

  return (
    <>
      <div className="flex flex-col h-screen z-h-screen p-4 bg-gray-100">
        <div className="flex-1 overflow-y-auto p-4 bg-white rounded-xl shadow-md mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <ReactMarkdown
                  rehypePlugins={[rehypeSanitize]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      console.log("inline", inline)
                      console.log("match", match)
                      return !inline && match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-1 p-2 border border-gray-300 rounded-xl bg-white"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded-xl"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
