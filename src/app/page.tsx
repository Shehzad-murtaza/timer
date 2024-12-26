"use client";
import { useState, useEffect } from "react";

const TimerApp = () => {
  const [time, setTime] = useState<number>(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isEditable, setIsEditable] = useState(true); // Editable input state
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false); // For detecting timer completion

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0 && isRunning) {
      setIsTimeUp(true); // Trigger blinking effect when timer ends
      setIsRunning(false); // Stop the timer
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, time]);

  // Sync input fields to total time
  useEffect(() => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
  }, [time]);

  // Set Timer and auto start
  const setTimer = () => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      setTime(hours * 3600 + minutes * 60 + seconds);
      setIsEditable(false); // Lock input after setting timer
      setIsRunning(true); // Automatically start the timer after setting
      setIsTimeUp(false); // Reset the time-up state
    }
  };

  // Reset Timer
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setIsEditable(true); // Unlock input
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsTimeUp(false); // Reset time-up state
  };

  // Handle Enter key press to set timer
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setTimer();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-800 via-purple-900 to-black text-white p-6">
      <h1 className="text-5xl font-extrabold mb-8 text-teal-200 drop-shadow-lg">
        Timer App
      </h1>

      {/* Timer Input/Display Box */}
      <div className="my-10 w-full max-w-md p-8 rounded-lg bg-gradient-to-br from-teal-900 via-purple-900 to-black bg-opacity-70 backdrop-blur-lg border-4 border-teal-500 shadow-xl">
        <div
          className={`text-6xl font-bold font-mono flex items-center justify-center text-teal-200 ${isEditable ? "cursor-text" : ""}`}
          onClick={() => isEditable && setIsEditable(true)} // Make editable on click
        >
          <input
            type="text"
            value={hours.toString().padStart(2, "0")}
            onChange={(e) =>
              setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))
            }
            onKeyPress={handleKeyPress}
            className={`w-20 text-center bg-transparent outline-none appearance-none ${
              isEditable
                ? "border-b-2 border-teal-400 focus:ring-2 focus:ring-teal-500"
                : "pointer-events-none"
            } ${isTimeUp ? "text-red-500 animate-blink" : ""}`} // Add blink effect and red text if time's up
          />
          <span className="mx-2 text-teal-300">:</span>
          <input
            type="text"
            value={minutes.toString().padStart(2, "0")}
            onChange={(e) =>
              setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))
            }
            onKeyPress={handleKeyPress}
            className={`w-20 text-center bg-transparent outline-none appearance-none ${
              isEditable
                ? "border-b-2 border-teal-400 focus:ring-2 focus:ring-teal-500"
                : "pointer-events-none"
            } ${isTimeUp ? "text-red-500 animate-blink" : ""}`} // Same for minutes
          />
          <span className="mx-2 text-teal-300">:</span>
          <input
            type="text"
            value={seconds.toString().padStart(2, "0")}
            onChange={(e) =>
              setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))
            }
            onKeyPress={handleKeyPress}
            className={`w-20 text-center bg-transparent outline-none appearance-none ${
              isEditable
                ? "border-b-2 border-teal-400 focus:ring-2 focus:ring-teal-500"
                : "pointer-events-none"
            } ${isTimeUp ? "text-red-500 animate-blink" : ""}`} // Same for seconds
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-6 mt-8">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className={`w-40 py-3 text-lg font-bold rounded-lg transition duration-200 ${
            time > 0
              ? "bg-teal-500 hover:bg-teal-600 text-white"
              : "bg-gray-400 text-gray-300 cursor-not-allowed"
          }`}
          disabled={time === 0} // Disable Start/Pause if timer is not set
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="w-40 py-3 text-lg font-bold bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
        >
          Reset
        </button>
        {isEditable && (
          <button
            onClick={setTimer}
            className={`w-40 py-3 text-lg font-bold ${
              hours === 0 && minutes === 0 && seconds === 0
                ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600 text-white"
            } rounded-lg transition duration-200`}
            disabled={hours === 0 && minutes === 0 && seconds === 0}
          >
            Set Timer
          </button>
        )}
      </div>
    </div>
  );
};

export default TimerApp;
