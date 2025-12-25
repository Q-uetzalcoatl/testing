export const QUIZZES = [
  {
    id: 1,
    title: "Midterm Examination",
    subject: "DCIT 26",
    description: "Application Development and Emerging Technologies",
    duration: 60,
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of React?",
        options: ["Database Management", "Building User Interfaces", "Server-Side Logic", "Operating System"],
        correct: 1
      },
      {
        id: 2,
        question: "Which hook is used for side effects?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correct: 1
      }
    ]
  },
  {
    id: 2,
    title: "Final Project Quiz",
    subject: "IT 101",
    description: "Introduction to Computing",
    duration: 45,
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        correct: 0
      }
    ]
  }
];
