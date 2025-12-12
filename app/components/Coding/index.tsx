"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { FaChartLine, FaPlay, FaCheck, FaTrash } from "react-icons/fa";

const Coding = () => {
  const [code, setCode] = useState(`// Write your code here
function greet(name) {
  return "Hello, " + name + "!";
}

// Test your function
console.log(greet("World"));
  `);

  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  const runCode = () => {
    setOutput(""); // Clear output trước
    setIsError(false);

    try {
      // Tạo array để lưu tất cả output
      const logs: string[] = [];

      // Override console methods
      const mockConsole = {
        log: (...args: any[]) => {
          logs.push(
            args
              .map((arg) =>
                typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
              )
              .join(" ")
          );
        },
        error: (...args: any[]) => {
          logs.push(
            "❌ " +
              args
                .map((arg) =>
                  typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
                )
                .join(" ")
          );
        },
        warn: (...args: any[]) => {
          logs.push(
            "⚠️ " +
              args
                .map((arg) =>
                  typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
                )
                .join(" ")
          );
        },
        info: (...args: any[]) => {
          logs.push(
            "ℹ️ " +
              args
                .map((arg) =>
                  typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
                )
                .join(" ")
          );
        }
      };

      // Tách code thành các dòng để xử lý expression cuối cùng
      const codeLines = code.trim().split("\n");
      let lastLine = "";
      let mainCode = code;

      // Tìm dòng cuối cùng không phải comment rỗng
      for (let i = codeLines.length - 1; i >= 0; i--) {
        const line = codeLines[i].trim();
        if (line && !line.startsWith("//") && !line.startsWith("/*")) {
          lastLine = line;
          break;
        }
      }

      // Kiểm tra xem dòng cuối có phải là expression không (không có const/let/var/function/if/for...)
      const isStatement =
        /^(const|let|var|function|if|else|for|while|do|switch|class|import|export|return|break|continue|throw)\s/.test(
          lastLine
        );

      if (
        !isStatement &&
        lastLine &&
        !lastLine.startsWith("console.") &&
        !lastLine.includes("=")
      ) {
        // Nếu là expression thuần, wrap nó để return
        const lastLineIndex = code.lastIndexOf(lastLine);
        mainCode = code.substring(0, lastLineIndex);

        const func = new Function(
          "console",
          `
          ${mainCode}
          return (${lastLine});
        `
        );
        const result = func(mockConsole);

        // Hiển thị kết quả của expression cuối
        if (result !== undefined) {
          logs.push(
            "← " +
              (typeof result === "object"
                ? JSON.stringify(result, null, 2)
                : String(result))
          );
        }
      } else {
        // Chạy code bình thường
        const func = new Function("console", code);
        func(mockConsole);
      }

      // Hiển thị output
      if (logs.length > 0) {
        setOutput(logs.join("\n"));
      } else {
        setOutput("✅ Code chạy thành công! (Không có output)");
      }
    } catch (error: any) {
      setIsError(true);

      // Parse lỗi để hiển thị đẹp hơn
      const errorMessage = error.message || "Unknown error";
      const errorStack = error.stack || "";

      // Tách phần line number từ stack
      const lineMatch = errorStack.match(/\(.*:(\d+):(\d+)\)/);
      let errorOutput = `❌ LỖI: ${errorMessage}`;

      if (lineMatch) {
        errorOutput += `\n📍 Dòng ${lineMatch[1]}, cột ${lineMatch[2]}`;
      }

      setOutput(errorOutput);
      console.error("Chi tiết lỗi:", error);
    }
  };

  const clearOutput = () => {
    setOutput("");
    setIsError(false);
  };

  const resetCode = () => {
    setCode(`// Write your code here
function greet(name) {
  return "Hello, " + name + "!";
}

// Test your function
console.log(greet("ChatGPT"));
console.log(greet("World"));
`);
    setOutput("");
    setIsError(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-100 overflow-hidden w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Bài tập: Create a greeting function</h3>
        <p className="text-indigo-100 mb-1">
          Write a function that takes a name and returns "Hello, [name]!"
        </p>
        <p className="text-sm text-indigo-200">
          Viết một hàm nhận tên và trả về lời chào
        </p>
      </div>

      <div className="p-6">
        {/* EDITOR */}
        <div className="border-2 border-gray-800 rounded-xl overflow-hidden shadow-lg">
          <Editor
            height="350px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              lineNumbers: "on",
              renderLineHighlight: "all",
              automaticLayout: true
            }}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-4 flex-wrap">
          <button
            onClick={runCode}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-md"
          >
            <FaPlay className="w-4 h-4" />
            Chạy code
          </button>

          <button
            onClick={clearOutput}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-md"
          >
            <FaTrash className="w-4 h-4" />
            Xóa output
          </button>

          <button
            onClick={resetCode}
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-md"
          >
            Reset code
          </button>
        </div>

        {/* OUTPUT */}
        <div
          className={`mt-4 p-4 rounded-lg font-mono text-sm border-2 ${
            isError
              ? "bg-red-50 border-red-300 text-red-900"
              : "bg-gray-900 border-gray-700 text-white"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <strong className={isError ? "text-red-700" : "text-green-400"}>
              {isError ? "🔴 Console (Có lỗi)" : "💻 Console Output"}
            </strong>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed">
            {output || '👉 Nhấn "Chạy code" để xem kết quả...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Coding;
