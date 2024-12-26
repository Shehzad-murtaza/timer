"use client";
import { useState, useEffect } from "react";
import { Background } from "@/components/Background";

const TimerApp = () => {
  const [time, setTime] = useState<number>(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isEditable, setIsEditable] = useState(true); // Editable input state
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Format time for display
  const formatTime = () => {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
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

  // Set Timer
  const setTimer = () => {
    setTime(hours * 3600 + minutes * 60 + seconds);
    setIsEditable(false); // Lock input after setting timer
  };

  // Reset Timer
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setIsEditable(true); // Unlock input
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <>
      <div className="fixed inset-0 w-full h-full z-[-1]">
        <Background />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
        <h1 className="text-5xl font-extrabold mb-8 text-teal-400">Timer App</h1>

        {/* Timer Input/Display */}
        <div className="my-10">
          <div
            className={`text-6xl font-bold font-mono flex items-center justify-center text-teal-200 ${
              isEditable ? "cursor-text" : ""
            }`}
            onClick={() => isEditable && setIsEditable(true)} // Make editable on click
          >
            <input
              type="text"
              value={hours.toString().padStart(2, "0")}
              onChange={(e) =>
                setHours(
                  Math.max(0, Math.min(23, parseInt(e.target.value) || 0))
                )
              }
              className={`w-20 text-center bg-transparent outline-none appearance-none ${
                isEditable
                  ? "border-b-2 border-teal-400 focus:ring-2"
                  : "pointer-events-none"
              }`}
            />
            <span className="mx-2">:</span>
            <input
              type="text"
              value={minutes.toString().padStart(2, "0")}
              onChange={(e) =>
                setMinutes(
                  Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                )
              }
              className={`w-20 text-center bg-transparent outline-none appearance-none ${
                isEditable
                  ? "border-b-2 border-teal-400 focus:ring-2"
                  : "pointer-events-none"
              }`}
            />
            <span className="mx-2">:</span>
            <input
              type="text"
              value={seconds.toString().padStart(2, "0")}
              onChange={(e) =>
                setSeconds(
                  Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                )
              }
              className={`w-20 text-center bg-transparent outline-none appearance-none ${
                isEditable
                  ? "border-b-2 border-teal-400 focus:ring-2"
                  : "pointer-events-none"
              }`}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-6">
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className={`w-40 py-3 text-lg font-bold rounded-lg transition ${
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
            className="w-40 py-3 text-lg font-bold bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Reset
          </button>
          {isEditable && (
            <button
              onClick={setTimer}
              className="w-40 py-3 text-lg font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition"
            >
              Set Timer
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TimerApp;
