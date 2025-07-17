import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { questions } from "./QuizPage";

const roles = [
  "Internal Control Expert",
  "Internal Auditor",
  "Functional Data Expert",
  "Project Managing Expert",
  "Global Routine Expert",
];

function calculateScores(responses) {
  const totals = [0, 0, 0, 0, 0];
  responses.forEach((r, i) => {
    const scores = questions[i].options[r].scores;
    scores.forEach((val, idx) => {
      totals[idx] += val;
    });
  });
  return totals;
}

function submitToGoogleForm(empId, email, answers, resultRole) {
  const formUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLScE2e1d0X2cY24929BgB7wwAk4kF_f0eM3O5kgZOgi3LIJvsA/formResponse";

  const formData = new FormData();
  formData.append("entry.771353699", empId); // Emp ID
  formData.append("entry.1150064510", email); // Email
  formData.append("entry.172342013", answers.join(", ")); // Answers
  formData.append("entry.582212971", resultRole); // Final Role

  fetch(formUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
}

function ResultPage({ answers, userInfo, onBack }) {
  const hasSubmitted = useRef(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const scores = calculateScores(answers);
  const max = Math.max(...scores);
  const topIndex = scores.indexOf(max);
  const result = roles[topIndex];

  useEffect(() => {
    if (!hasSubmitted.current) {
      submitToGoogleForm(userInfo.empId, userInfo.email, answers, result);
      hasSubmitted.current = true;

      // Stop confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [answers, userInfo.empId, userInfo.email, result]);

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
        />
      )}
      <div className="bg-black text-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center z-10">
        <h2 className="text-2xl font-bold text-amber mb-4">Hi {userInfo.name}!</h2>
        <p className="text-lg mb-6">Based on your answers, your best match is:</p>
        <div className="bg-amber text-black font-bold p-6 rounded-2xl text-xl">
          {result}
        </div>
        <button
          className="mt-6 bg-gray-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-gray-700"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
