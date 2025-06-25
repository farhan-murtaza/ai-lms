// components/QuizModal.tsx
import { useState } from "react";

export default function QuizModal({ questions, onSubmit }) {
  const [answers, setAnswers] = useState({});

  const handleChange = (qIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-transparent flex justify-center items-center">
      <div className="bg-white p-4 rounded-xl w-[90%] max-w-lg">
        <h2 className="text-xl font-bold mb-4">Quiz Time!</h2>
        {questions.map((q, i) => (
          <div key={i} className="mb-4">
            <p>{q.question}</p>
            {q.options.map((opt: string, j: number) => (
              <div key={j}>
                <label>
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    onChange={() => handleChange(i, opt)}
                  />
                  {opt}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
