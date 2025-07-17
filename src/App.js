import React, { useState } from "react";
import LandingPage from "./LandingPage";
import QuizPage from "./QuizPage";
import ResultPage from "./ResultPage";

function App() {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({ empId: "", email: "" });
  const [answers, setAnswers] = useState([]);

  const handleStart = (info) => {
    setUserInfo(info);
    setStep(2);
  };

  const handleSubmitQuiz = (selectedAnswers) => {
    setAnswers(selectedAnswers);
    setStep(3);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black text-white">
      {step === 1 && <LandingPage onStart={handleStart} />}
      {step === 2 && <QuizPage onSubmit={handleSubmitQuiz} onBack={handleBack} />}
      {step === 3 && <ResultPage answers={answers} userInfo={userInfo} onBack={handleBack} />}
    </div>
  );
}

export default App;
