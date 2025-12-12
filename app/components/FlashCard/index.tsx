import buildEndpoint from "@/utils/url";
import React, { useEffect, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import Loading from "../Loading/Loading";

interface Flashcard {
  question: string;
  vietnamese: string;
  answer: string;
  answerVi: string;
  example: string;
}
const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const [showAnswer, setShowAnswer] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const res = await fetch(buildEndpoint("/flashcards"));
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
        <Loading />
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

  const card = flashcards[currentFlashcard];
  return (
    <div>
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
              <p className="text-2xl font-bold text-gray-800 mb-2">{card?.question}</p>
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
  );
};

export default Flashcards;
