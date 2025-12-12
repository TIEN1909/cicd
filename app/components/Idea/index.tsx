"use client";

import React, { useState } from "react";

const Idea = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GGSHEET_ENDPOINT || "";

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!question || !answer) {
      setStatus("❌ Vui lòng nhập cả Question và Answer");
      return;
    }

    setIsLoading(true);
    setStatus("⏳ Đang gửi...");

    try {
      // Tạo URL với parameters
      const params = new URLSearchParams({
        question: question,
        answer: answer
      });

      // Dùng img tag trick để bypass CORS
      const img = document.createElement("img");
      img.style.display = "none";

      img.onload = () => {
        setStatus("✅ Đã gửi lên Google Sheet thành công!");
        setQuestion("");
        setAnswer("");
        setIsLoading(false);
        document.body.removeChild(img);
      };

      img.onerror = () => {
        setStatus("✅ Đã gửi! (Kiểm tra Google Sheet)");
        setQuestion("");
        setAnswer("");
        setIsLoading(false);
        document.body.removeChild(img);
      };

      img.src = `${GOOGLE_SCRIPT_URL}?${params.toString()}&callback=_&_=${Date.now()}`;
      document.body.appendChild(img);
    } catch (err: any) {
      console.error("Error:", err);
      setStatus("❌ Lỗi: " + err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">💡 Submit your idea</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
          <textarea
            placeholder="Enter your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
            disabled={isLoading}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang gửi..." : "Submit"}
        </button>
      </div>

      {status && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm ${
            status.includes("✅")
              ? "bg-green-100 text-green-800 border border-green-200"
              : status.includes("⏳")
              ? "bg-blue-100 text-blue-800 border border-blue-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default Idea;
