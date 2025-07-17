import React, { useState } from "react";

export const questions = [
  {
    q: "You enjoy work where you...",
    options: [
      { text: "Apply company policies and document your tests", scores: [3,1,0,0,0] },
      { text: "Independently review processes for compliance", scores: [1,3,0,0,0] },
      { text: "Work with data and spot unusual patterns", scores: [0,0,3,1,0] },
      { text: "Plan tools and dashboards to improve systems", scores: [0,0,1,3,1] },
      { text: "Coordinate across regions and ensure things stay on track", scores: [0,0,0,1,3] },
    ],
  },
  {
    q: "Which task sounds most interesting to you?",
    options: [
      { text: "Testing if controls are working properly", scores: [3,1,0,0,0] },
      { text: "Auditing a process to see if it's reliable", scores: [1,3,0,0,0] },
      { text: "Finding unusual trends or outliers in reports", scores: [0,0,3,1,0] },
      { text: "Managing a project to automate checks", scores: [0,0,1,3,1] },
      { text: "Overseeing how assessments happen across regions", scores: [0,0,0,1,3] },
    ],
  },
  {
    q: "Your strongest skill is…",
    options: [
      { text: "Understanding processes and policies", scores: [3,1,0,0,0] },
      { text: "Asking deep questions and spotting gaps", scores: [1,3,0,0,0] },
      { text: "Working with data and drawing insights", scores: [0,0,3,1,0] },
      { text: "Coordinating projects with multiple teams", scores: [0,0,1,3,1] },
      { text: "Monitoring and governance at a high level", scores: [0,0,0,1,3] },
    ],
  },
  {
    q: "If you notice something wrong in a process, you...",
    options: [
      { text: "Check if it violates the defined controls", scores: [3,1,0,0,0] },
      { text: "Dig deeper to understand root causes", scores: [1,3,0,0,0] },
      { text: "Pull reports and validate numbers", scores: [0,0,3,1,0] },
      { text: "Raise it in a project discussion for improvement", scores: [0,0,1,3,1] },
      { text: "Monitor if similar issues are happening elsewhere", scores: [0,0,0,1,3] },
    ],
  },
  {
    q: "You prefer to work on tasks that are...",
    options: [
      { text: "Structured and repeatable", scores: [3,1,0,0,0] },
      { text: "Investigative and independent", scores: [1,3,0,0,0] },
      { text: "Data-driven and logical", scores: [0,0,3,1,0] },
      { text: "Strategic and solution-building", scores: [0,0,1,3,1] },
      { text: "Collaborative and global in scope", scores: [0,0,0,1,3] },
    ],
  },
];

function QuizPage({ onSubmit, onBack }) {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));

  const handleSelect = (qIndex, optionIndex) => {
    const updated = [...responses];
    updated[qIndex] = optionIndex;
    setResponses(updated);
  };

  const isComplete = responses.every((r) => r !== null);

  return (
    <div className="bg-black text-white rounded-2xl p-8 shadow-lg max-w-3xl w-full">
      <h2 className="text-xl font-bold text-center text-amber mb-4">Quiz</h2>
      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="mb-2 font-semibold">{i + 1}. {q.q}</p>
          {q.options.map((opt, j) => (
            <label key={j} className="block bg-gray-800 hover:bg-gray-700 rounded-xl p-3 cursor-pointer mb-2">
              <input
                type="radio"
                name={`q-${i}`}
                value={j}
                checked={responses[i] === j}
                onChange={() => handleSelect(i, j)}
                className="mr-2"
              />
              {opt.text}
            </label>
          ))}
        </div>
      ))}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-gray-700"
        >
          Back
        </button>
        <button
          onClick={() => onSubmit(responses)}
          disabled={!isComplete}
          className={`bg-amber text-black font-bold py-2 px-6 rounded-xl ${
            !isComplete ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
