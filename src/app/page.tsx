'use client';
import { useState, useEffect } from "react";

const TimerApp = () => {
  const [time, setTime] = useState<number>(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0); // Hours slider
  const [minutes, setMinutes] = useState(0); // Minutes slider
  const [seconds, setSeconds] = useState(0); // Seconds slider
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility

  // Format time for display
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

  // Handle timer setting with sliders
  const setTimer = () => {
    setTime(hours * 3600 + minutes * 60 + seconds);
    setModalOpen(false); // Close modal after setting the timer
  };

  // Reset timer
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-teal-400">Modern Timer App</h1>

      {/* Timer Display */}
      <div className="text-7xl font-bold font-mono my-10 text-teal-200">
        {formatTime(time)}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className={`w-40 py-3 text-lg font-bold rounded-lg transition ${
            isRunning || time > 0
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
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
        <button
          onClick={() => setModalOpen(true)}
          className="w-40 py-3 text-lg font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition"
        >
          Set Timer
        </button>
      </div>

      {/* Modal for Slider Inputs */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg text-white w-96">
            <h2 className="text-xl font-bold mb-4">Set Time Using Sliders</h2>

            {/* Hours Slider */}
            <div className="flex flex-col items-center mb-4">
              <label className="text-lg">Hours: {hours}</label>
              <input
                type="range"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-2 bg-teal-300 rounded-lg"
              />
            </div>

            {/* Minutes Slider */}
            <div className="flex flex-col items-center mb-4">
              <label className="text-lg">Minutes: {minutes}</label>
              <input
                type="range"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full h-2 bg-teal-300 rounded-lg"
              />
            </div>

            {/* Seconds Slider */}
            <div className="flex flex-col items-center mb-4">
              <label className="text-lg">Seconds: {seconds}</label>
              <input
                type="range"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                className="w-full h-2 bg-teal-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={setTimer}
                className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerApp;
