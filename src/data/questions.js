export const questions = [
  {
    id: 1,
    question: "What is the primary purpose of React's Virtual DOM?",
    options: ["To directly manipulate the browser DOM", "To optimize rendering performance", "To manage database connections", "To style components"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which hook is used to perform side effects in a functional component?",
    options: ["useState", "useReducer", "useEffect", "useMemo"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What is the correct way to update state that depends on the previous state?",
    options: ["setCount(count + 1)", "setCount(prev => prev + 1)", "state.count = state.count + 1", "forceUpdate()"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "In React Router, which component is used to define the dynamic part of a URL?",
    options: ["<Route path='/user/:id' />", "<Link to='/user' />", "<Switch>", "<Router>"],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "What does the 'key' prop help React identify?",
    options: ["Which items have changed, added, or removed", "The style of the element", "The index of the array", "The parent component"],
    correctAnswer: 0
  },
  {
    id: 6,
    question: "Which command creates a new Vite project?",
    options: ["npm create-react-app", "npm create vite@latest", "npx install react", "git init vite"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What is the purpose of Context API?",
    options: ["To replace Redux entirely", "To avoid prop drilling", "To improve SEO", "To fetch data from APIs"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "How do you prevent a form refresh in React?",
    options: ["event.stopPropogation()", "event.preventDefault()", "return false", "refresh = false"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is the default port for a Vite development server?",
    options: ["3000", "8080", "5173", "8000"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "Which rule must be followed when calling hooks?",
    options: ["Call them inside loops", "Call them inside nested functions", "Call them at the top level", "Call them conditionally"],
    correctAnswer: 2
  }
];
