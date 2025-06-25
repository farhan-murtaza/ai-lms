// components/ResultModal.tsx

export default function ResultModal({ answers, questions, onClose }) {
  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  return (
    <div className="fixed inset-0 z-[1000] bg-transparent flex justify-center items-center">
      <div className="bg-white p-4 rounded-xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Your Results</h2>
        <p>
          You got {score} out of {questions.length} correct.
        </p>
        <button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
