"use client";

import { useState, useEffect } from "react";
import { FaBook, FaCode, FaTrophy } from "react-icons/fa";
import MenuLeft from "./components/MenuLeft";
import buildEndpoint from "./utils/url";
import Coding from "./components/Coding";
import Flashcards from "./components/FlashCard";
import Idea from "./components/Idea";

export default function Home() {
  const [currentView, setCurrentView] = useState("flashcard");

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
            Add Idea
          </button>
        </div>

        {currentView === "flashcard" && <Flashcards />}

        {currentView === "coding" && <Coding />}

        {currentView === "quiz" && <Idea />}
      </div>
    </div>
  );
}
