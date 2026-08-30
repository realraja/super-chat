import React, { useEffect, useState } from "react";

const TimerPage = () => {
  const totalTime = 60; // in seconds
  const [timeLeft, setTimeLeft] = useState(totalTime);

  // Progress in percentage (0 to 100)
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Calculate stroke dashoffset for SVG circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl mb-6 font-bold">🕒 1-Minute Timer</h1>

      <div className="relative w-40 h-40">
        <svg width="160" height="160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#333"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#10b981"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          {timeLeft}s
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
