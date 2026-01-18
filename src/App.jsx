import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Tool Markup Language",
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlinks Text Mark Language"
    ],
    correctAnswer: 1
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-color", "text-color", "color", "bgcolor"],
    correctAnswer: 2
  },
  {
    question: "Which hook is used for state in React?",
    options: ["useState", "useEffect", "useRef", "useMemo"],
    correctAnswer: 0
  },
  {
    question: "Which symbol is used for ID selector in CSS?",
    options: [".", "&", "*", "#"],
    correctAnswer: 3
  },
  {
    question: "Which method converts JSON to object?",
    options: ["JSON.stringify()", "JSON.parse()", "parseJSON()", "convert()"],
    correctAnswer: 1
  }
];

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index) => {
    if (!isAnswered) {
      setSelectedOption(index);
      setIsAnswered(true);

      if (index === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  const totalQuestions = questions.length;
  const wrongAnswers = totalQuestions - score;
  const percentage = Math.round((score / totalQuestions) * 100);

  let grade = "";
  let status = "";

  if (percentage >= 80) {
    grade = "A";
    status = "Excellent Performance ";
  } else if (percentage >= 60) {
    grade = "B";
    status = "Good Job ";
  } else if (percentage >= 40) {
    grade = "C";
    status = "Average Performance ";
  } else {
    grade = "D";
    status = "Needs Improvement ";
  }

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="app">
      <div className="quiz-container">

        <h2 className="title">React Quiz App</h2>

     
        {!showResult && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        {showResult ? (
          <div className="result-box">
            <h3>Quiz Completed </h3>
            <div className="result-card">
              <p>Total Questions: {totalQuestions}</p>
              <p>Correct Answers: {score}</p>
              <p>Wrong Answers: {wrongAnswers}</p>
              <p>Percentage: {percentage}%</p>
              <h3 className="grade">Grade: {grade}</h3>
              <h4 className="status">{status}</h4>
            </div>
            <button onClick={handleRestart} className="restart-btn">Restart Quiz</button>
          </div>
        ) : (
          <>
            <h4>Question {currentQuestion + 1} / {totalQuestions}</h4>
            <p className="question-text">{questions[currentQuestion].question}</p>

            {questions[currentQuestion].options.map((option, index) => {
              let optionClass = "option";

              if (isAnswered) {
                if (index === questions[currentQuestion].correctAnswer) {
                  optionClass = "option correct";
                } else if (index === selectedOption) {
                  optionClass = "option wrong";
                }
              }

              return (
                <div
                  key={index}
                  className={optionClass}
                  onClick={() => handleOptionClick(index)}
                >
                  {option}
                </div>
              );
            })}

            {isAnswered && (
              <p className="feedback-text">
                {selectedOption === questions[currentQuestion].correctAnswer
                  ? "Correct Answer "
                  : "Wrong Answer "}
              </p>
            )}

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="next-btn"
            >
              Next
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
