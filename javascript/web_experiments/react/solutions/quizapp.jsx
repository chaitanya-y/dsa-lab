import React, { useState } from "react";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Oracle"],
    answer: "Netscape",
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: "//",
  },
  {
    question: "Which method is used to print in the browser console?",
    options: ["print()", "echo()", "console.log()", "log.print()"],
    answer: "console.log()",
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["let", "var", "const", "static"],
    answer: "const",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f7fb",
  },
  card: {
    width: "100%",
    maxWidth: "560px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  progress: {
    marginBottom: "12px",
    fontSize: "14px",
    color: "#6b7280",
  },
  question: {
    margin: "0 0 16px",
    fontSize: "20px",
    color: "#111827",
  },
  options: {
    display: "grid",
    gap: "12px",
    marginBottom: "20px",
  },
  optionRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  result: {
    margin: 0,
    fontSize: "24px",
    color: "#111827",
  },
  scoreText: {
    marginTop: "12px",
    fontSize: "16px",
    color: "#374151",
  },
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      setScore((prev) => (isCorrect ? prev + 1 : prev));
      setIsCompleted(true);
      return;
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer("");
  };

  if (isCompleted) {
    return (
      <main style={styles.page}>
        <section style={styles.card} aria-live="polite">
          <h1 style={styles.result}>Quiz Complete</h1>
          <p style={styles.scoreText}>
            Your score: {score} / {questions.length}
          </p>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.progress}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>

        <h1 id="question-title" style={styles.question}>
          {currentQuestion.question}
        </h1>

        <div
          style={styles.options}
          role="radiogroup"
          aria-labelledby="question-title"
        >
          {currentQuestion.options.map((option, index) => {
            const inputId = `question-${currentQuestionIndex}-option-${index}`;

            return (
              <div key={option} style={styles.optionRow}>
                <input
                  id={inputId}
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                />
                <label htmlFor={inputId}>{option}</label>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          style={{
            ...styles.button,
            ...(!selectedAnswer ? styles.buttonDisabled : {}),
          }}
        >
          Submit
        </button>
      </section>
    </main>
  );
}

export default App;