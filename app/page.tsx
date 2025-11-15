"use client";

import { useState, useEffect } from "react";
import {
  FaBook,
  FaCode,
  FaTrophy,
  FaChartLine,
  FaPlay,
  FaCheck,
  FaTimes,
  FaVolumeUp,
  FaStar
} from "react-icons/fa";
import MenuLeft from "./components/MenuLeft";

interface Flashcard {
  question: string;
  vietnamese: string;
  answer: string;
  answerVi: string;
  example: string;
}

export default function Home() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const [currentView, setCurrentView] = useState("flashcard");
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  const [code, setCode] = useState(
    "// Write your code here\nfunction greet(name) {\n  \n}"
  );

  const [quizAnswer, setQuizAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const res = await fetch("https://strapi-cms-7rd8.onrender.com/api/flashcards");
        const json = await res.json();
        console.log("Fetched Strapi data:", json);
        const items = json.data;
        setFlashcards(items);
      } catch (error) {
        console.error("Lỗi fetching Strapi:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlashcards();
  }, []);

  if (!isClient || loading) {
    return (
      <div className="p-10 text-xl font-semibold text-indigo-600">
        Đang tải flashcards...
      </div>
    );
  }

  if (!flashcards.length) {
    return (
      <div className="p-10 text-xl font-semibold text-red-600">
        Không có flashcards trong Strapi!
      </div>
    );
  }

  const nextFlashcard = () => {
    setShowAnswer(false);
    setCurrentFlashcard((prev) => (prev + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setShowAnswer(false);
    setCurrentFlashcard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  const checkQuizAnswer = () => {
    setShowResult(true);
  };

  const card = flashcards[currentFlashcard];
  console.log("Current card:", card);

  return (
    <div className="flex">
      <MenuLeft />
      <div className="mt-16 ml-80 mb-16 flex-1 p-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setCurrentView("flashcard")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentView === "flashcard"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaBook className="w-5 h-5" />
            Flashcards
          </button>
          <button
            onClick={() => setCurrentView("coding")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentView === "coding"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaCode className="w-5 h-5" />
            Code Practice
          </button>
          <button
            onClick={() => setCurrentView("quiz")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentView === "quiz"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaTrophy className="w-5 h-5" />
            Quiz
          </button>
        </div>

        {currentView === "flashcard" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col justify-between border-2 border-indigo-100">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Thẻ {currentFlashcard + 1} / {flashcards.length}
                  </span>
                  <button
                    onClick={() => speakText(card?.question)}
                    className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <FaVolumeUp className="w-5 h-5 text-indigo-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 mb-2">
                      {card?.question}
                    </p>
                    <p className="text-lg text-gray-600">{card?.vietnamese}</p>
                  </div>

                  {showAnswer && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 animate-fade-in">
                      <p className="text-xl font-semibold text-green-900 mb-2">
                        {card?.answer}
                      </p>
                      <p className="text-lg text-green-700 mb-4">{card?.answerVi}</p>
                      <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
                        {card?.example}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={prevFlashcard}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors"
                >
                  ← Trước
                </button>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {showAnswer ? "Ẩn đáp án" : "Hiện đáp án"}
                </button>
                <button
                  onClick={nextFlashcard}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors"
                >
                  Tiếp →
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === "coding" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-100">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Bài tập: Create a greeting function
                </h3>
                <p className="text-indigo-100 mb-1">
                  Write a function that takes a name and returns Hello, [name]!
                </p>
                <p className="text-sm text-indigo-200">Viết một hàm nhận tên</p>
              </div>

              <div className="p-6">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-lg border-2 border-gray-700 focus:border-indigo-500 focus:outline-none"
                  spellCheck="false"
                />

                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                    <FaPlay className="w-5 h-5" />
                    Chạy code
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors">
                    <FaCheck className="w-5 h-5" />
                    Kiểm tra
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <FaChartLine className="w-5 h-5" />
                Từ vựng mới:
              </h4>
              <ul className="space-y-2 text-blue-800">
                <li>
                  <strong>function:</strong> hàm - a block of reusable code
                </li>
                <li>
                  <strong>parameter:</strong> tham số - input value for a function
                </li>
                <li>
                  <strong>return:</strong> trả về - give back a result
                </li>
              </ul>
            </div>
          </div>
        )}

        {currentView === "quiz" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-100">
              <div className="mb-6">
                <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Câu hỏi 1 / 1
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-2xl font-bold text-gray-800 mb-2">{card.question}</p>
                  <p className="text-lg text-gray-600">{card.vietnamese}</p>
                </div>

                <div>
                  <input
                    type="text"
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    placeholder="Your answer..."
                    className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-indigo-500 focus:outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Gợi ý: Trả lời bằng tiếng Anh
                  </p>
                </div>

                {showResult && (
                  <div
                    className={`p-6 rounded-xl ${
                      quizAnswer.toLowerCase().trim() === card.answer.toLowerCase().trim()
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    {quizAnswer.toLowerCase().trim() ===
                    card.answer.toLowerCase().trim() ? (
                      <div className="flex items-center gap-3 text-green-800">
                        <FaCheck className="w-6 h-6" />
                        <span className="font-semibold text-lg">
                          Chính xác! Excellent work! 🎉
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-3 text-red-800 mb-2">
                          <FaTimes className="w-6 h-6" />
                          <span className="font-semibold text-lg">
                            Chưa đúng. Try again!
                          </span>
                        </div>
                        <p className="text-red-700">
                          Đáp án đúng: <strong>{card.answer}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={checkQuizAnswer}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-lg transition-colors"
                >
                  Kiểm tra câu trả lời
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
