import React, { useState } from "react";

function LandingPage({ onStart }) {
  const [empId, setEmpId] = useState("");
  const [email, setEmail] = useState("");

  const isEmpIdValid = /^\d{1,8}$/.test(empId);
  const isEmailValid = /^[^\s@]+@ab-inbev\.com$/.test(email);
  const isFormValid = isEmpIdValid && isEmailValid;


  return (
    <div className="bg-black text-white rounded-2xl p-8 shadow-lg max-w-md w-full">
      <h1 className="text-2xl font-bold text-amber text-center mb-6">Controls and Analytics Crew Matcher</h1>
      <div className="space-y-4">
        <input
          className="w-full p-3 rounded-xl bg-gray-800 text-white"
          placeholder="Emp ID"
          value={empId}
          maxLength={8}
          onChange={(e) => setEmpId(e.target.value.replace(/\D/g, ""))}
        />
        {!isEmpIdValid && empId && (
          <p className="text-red-500 text-sm">Emp ID must be 1 to 8 digits only</p>
        )}

        <input
          className="w-full p-3 rounded-xl bg-gray-800 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid && email && (
  <p className="text-red-500 text-sm">Please use your @ab-inbev.com email</p>
)}


        <button
          className={`w-full bg-amber text-black font-bold py-3 rounded-xl ${
            isFormValid ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => onStart({ empId, email })}
          disabled={!isFormValid}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
