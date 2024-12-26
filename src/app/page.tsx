"use client";
import { useState, useEffect } from "react";

const TimerApp = () => {
  const [time, setTime] = useState<number>(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false); // To track if time is up

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

  // Set Timer and start automatically
  const setTimer = () => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      setTime(hours * 3600 + minutes * 60 + seconds);
      setIsRunning(true); // Automatically start the timer after setting
      setIsTimeUp(false); // Reset the time-up state
    }
  };

  // Reset Timer
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
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

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (isTimeUp) setIsTimeUp(false); // Reset blinking if user changes input
    const value = Math.max(0, Math.min(field === 'hours' ? 23 : 59, parseInt(e.target.value) || 0));

    if (field === 'hours') {
      setHours(value);
    } else if (field === 'minutes') {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-teal-300 drop-shadow-lg">Timer App</h1>

      {/* Timer Input/Display Box */}
      <div className="my-10 w-full max-w-md p-8 rounded-lg bg-gradient-to-br from-purple-700 via-black to-black bg-opacity-80 backdrop-blur-lg border-4 border-purple-500 shadow-xl">
        <div className={`text-6xl font-bold font-mono flex items-center justify-center ${isTimeUp ? "text-red-500 animate-blink" : "text-teal-300"}`}>
          <input
            type="text"
            value={hours.toString().padStart(2, "0")}
            onChange={(e) => handleInputChange(e, 'hours')}
            onKeyPress={handleKeyPress}
            className={`w-20 text-center bg-transparent outline-none appearance-none ${isTimeUp ? "text-red-500" : "text-teal-300"}`}
          />
          <span className="mx-2 text-teal-400">:</span>
          <input
            type="text"
            value={minutes.toString().padStart(2, "0")}
            onChange={(e) => handleInputChange(e, 'minutes')}
            onKeyPress={handleKeyPress}
            className={`w-20 text-center bg-transparent outline-none appearance-none ${isTimeUp ? "text-red-500" : "text-teal-300"}`}
          />
          <span className="mx-2 text-teal-400">:</span>
          <input
            type="text"
            value={seconds.toString().padStart(2, "0")}
            onChange={(e) => handleInputChange(e, 'seconds')}
            onKeyPress={handleKeyPress}
            className={`w-20 text-center bg-transparent outline-none appearance-none ${isTimeUp ? "text-red-500" : "text-teal-300"}`}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-6 mt-8">
        {/* Show only Set Timer button when timer is not running */}
        {!isRunning && time === 0 && (
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

        {/* Pause Button when timer is running */}
        {isRunning && !isTimeUp && (
          <button
            onClick={() => setIsRunning(false)}
            className="w-40 py-3 text-lg font-bold bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition duration-200"
          >
            Pause
          </button>
        )}

        {/* Start Button when timer is paused */}
        {!isRunning && time > 0 && !isTimeUp && (
          <button
            onClick={() => setIsRunning(true)}
            className="w-40 py-3 text-lg font-bold bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200"
          >
            Start
          </button>
        )}

        {/* Reset Button when timer is running or paused */}
        {(isRunning || !isRunning || isTimeUp) && (
          <button
            onClick={resetTimer}
            className="w-40 py-3 text-lg font-bold bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default TimerApp;
