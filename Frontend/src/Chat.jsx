import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight"; // optional

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/chat/generate`,
        { message: userMsg },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.reply },
      ]);
    } catch (err) {
      // 🔐 Token expired or invalid → force re-login
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        window.location.reload();
        return;
      }

      // 🌐 Other server / network errors
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Server error. Please try again later.";

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `⚠️ ${msg}` },
      ]);
    }


    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen bg-[#0F1117]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-800 text-gray-200 text-xl font-semibold text-center">
        ChatBot
      </header>

      {/* Chat Area */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm
                ${msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-[#1A1D24] text-gray-200 border border-gray-800 rounded-bl-none"
                }`}
            >
              {/* Markdown rendering */}
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {/* AI Typing Loader */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1A1D24] border border-gray-800 text-gray-400 px-4 py-3 rounded-2xl rounded-bl-none w-20 animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-800 flex gap-3 bg-[#0F1117]">
        <textarea
          className="flex-1 bg-[#1A1D24] text-gray-200 p-3 rounded-xl border border-gray-700 resize-none h-14 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me Anything..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
        ></textarea>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl text-sm">
          Send
        </button>
      </form>
    </div>
  );
}
