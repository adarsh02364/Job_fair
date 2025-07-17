import React, { useState } from "react";

export default function LandingPage({ onStart }) {
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [email, setEmail] = useState("");
  const [isEmpIdValid, setIsEmpIdValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showNameError, setShowNameError] = useState(false);

  const validateInputs = () => {
    const empIdPattern = /^[0-9]{8}$/;
    const emailPattern = /^[^\s@]+@ab-inbev\.com$/i;

    const validEmpId = empIdPattern.test(empId);
    const validEmail = email === "" || emailPattern.test(email);
    const validName = name.trim() !== "";

    setIsEmpIdValid(validEmpId);
    setIsEmailValid(validEmail);
    setShowNameError(!validName);

    return validName && validEmpId && validEmail;
  };

  const handleStart = () => {
    if (validateInputs()) {
      onStart({ name, empId, email });
    }
  };

  const handleEmpIdChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (input.length <= 8) {
      setEmpId(input);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/ABI-DigitalBackground-09.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Tint overlay */}
      <div className="absolute inset-0 bg-black opacity-90 z-0" />

      {/* Logo */}
      <img
        src="/GHQI_Logo_Black Yellow copy.svg"
        alt="Logo"
        className="absolute top-10 w-48 h-auto z-10"
      />

      {/* Form container */}
      <div className="relative z-10 bg-black bg-opacity-10 rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-amber-400 mb-2">
          The Compliance Compass
        </h1>
        <p className="text-sm mb-6">
          Because every superhero has a role — let’s find yours!
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          {showNameError && (
            <p className="text-red-500 text-sm text-left">Name is required</p>
          )}

          <input
            type="text"
            placeholder="Emp ID"
            value={empId}
            onChange={handleEmpIdChange}
            className={`w-full p-2 rounded bg-gray-800 text-white ${
              !isEmpIdValid ? "border border-red-500" : ""
            }`}
          />
          {!isEmpIdValid && (
            <p className="text-red-500 text-sm text-left">
              Emp ID must be exactly 8 digits (numbers only)
            </p>
          )}

          <input
            type="email"
            placeholder="Email (Optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 rounded bg-gray-800 text-white ${
              !isEmailValid ? "border border-red-500" : ""
            }`}
          />
          {!isEmailValid && (
            <p className="text-red-500 text-sm text-left">
              Email must be in the format yourname@ab-inbev.com
            </p>
          )}

          <button
            onClick={handleStart}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded transition duration-300"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
