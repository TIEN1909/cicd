export const flashcards = [
    {
      question: "What does 'array.push()' do?",
      vietnamese: "array.push() làm gì?",
      answer: "Adds one or more elements to the end of an array",
      answerVi: "Thêm một hoặc nhiều phần tử vào cuối mảng",
      example: "const arr = [1, 2]; arr.push(3); // [1, 2, 3]"
    },
    {
      question: "What is a 'callback function'?",
      vietnamese: "Callback function là gì?",
      answer: "A function passed as an argument to another function",
      answerVi: "Một hàm được truyền làm đối số cho hàm khác",
      example: "setTimeout(() => console.log('Hi'), 1000);"
    },
    {
      question: "What does 'async/await' do?",
      vietnamese: "async/await làm gì?",
      answer: "Handles asynchronous operations in a synchronous-looking way",
      answerVi: "Xử lý các thao tác bất đồng bộ theo cách trông giống đồng bộ",
      example: "async function getData() { const data = await fetch(url); }"
    }
  ];

export const quizQuestions = [
    {
      question: "Complete the sentence: 'const' is used to declare a ___",
      vietnamese: "Hoàn thành câu: 'const' được dùng để khai báo một ___",
      correctAnswer: "constant",
      hint: "variable that cannot be reassigned"
    }
  ];
