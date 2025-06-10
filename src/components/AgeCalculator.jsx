import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { CalendarDays, Timer, SunMoon } from "lucide-react";

// Component imports
import AgeInsights from "./AgeInsights";
import ZodiacInsights from "./ZodiacInsights";
import HealthInsights from "./HealthInsights";
import ReportActions from "./ReportActions";
import HistoricHighlights from "./HistoricHighlights";

// Utility imports
import {
  getZodiacSign,
  getHinduRashi,
  getHinduZodiacElement,
  timeUntilNextBirthday,
  nextLeapYear,
  healthInsights,
} from "../utils/ageUtils";
import {
  fetchHistoricalEvents,
  fetchHistoricalBirths,
} from "../utils/historyUtils";

// Base URL for backend API (configured via environment variable)
const baseApi = import.meta.env.VITE_API_URL;
const baseUrl= import.meta.env.VITE_BASE_URL;

export default function AgeCalculator() {
  // === State Definitions ===
  const [dob, setDob] = useState(""); // User input: Date of Birth
  const [result, setResult] = useState(null); // Result data from backend
  const [dayOfWeek, setDayOfWeek] = useState(""); // Day of the week for DOB
  const [theme, setTheme] = useState("light"); // UI Theme (light/dark)
  const [ageInSeconds, setAgeInSeconds] = useState(null); // Live age tracker
  const [showConfetti, setShowConfetti] = useState(false); // Birthday animation
  const [historicEvents, setHistoricEvents] = useState([]); // Historical events on DOB
  const [birthFigures, setBirthFigures] = useState([]); // Famous births on DOB
  const [loadingEvents, setLoadingEvents] = useState(false); // Loader flag for historical fetch
  const [showResults, setShowResults] = useState(false); // Result visibility toggle

  // === Live Age Timer: Increments age every second ===
  useEffect(() => {
    if (ageInSeconds !== null) {
      const interval = setInterval(() => {
        setAgeInSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [ageInSeconds]);

  // === Theme Toggle Handler ===
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // === Form Submission Handler ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dob) return;

    try {
      // Send DOB to backend and retrieve result
      const res = await axios.post(`${baseApi}`, { dob });
      console.log("result received from backend: ", res.data);

      setResult(res.data); // Set calculated result
      setDayOfWeek(res.data.dayOfWeek); // Set day of the week

      // Calculate age in seconds
      const birthDate = new Date(dob);
      const now = new Date();
      setAgeInSeconds(Math.floor((now - birthDate) / 1000));

      // Show confetti on birthday
      if (
        now.getDate() === birthDate.getDate() &&
        now.getMonth() === birthDate.getMonth()
      ) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }

      // Fetch historical data
      setLoadingEvents(true);
      const birthMonth = birthDate.getMonth() + 1;
      const birthDay = birthDate.getDate();

      const events = await fetchHistoricalEvents(birthMonth, birthDay);
      const births = await fetchHistoricalBirths(birthMonth, birthDay);

      // Filter inappropriate events
      const cleanEvents = events.filter(
        (e) =>
          !/massacre|murder|died|killed|war|battle|assassinated|bomb/.test(
            e.text.toLowerCase()
          )
      );

      setHistoricEvents(cleanEvents.slice(0, 5));
      setBirthFigures(births.slice(0, 5));
      setLoadingEvents(false);
      setShowResults(true);
    } catch (err) {
      console.error("Error calculating age:", err);
      alert("Failed to calculate age");
    }
  };

  // === Derived Values for Display ===
  const zodiac = dob ? getZodiacSign(dob) : "";
  const rashi = getHinduRashi(dob);
  const element = getHinduZodiacElement(dob);
  const leap = nextLeapYear();
  const daysToBirthday = timeUntilNextBirthday(dob);
  const health = healthInsights(
    result?.years,
    result?.months,
    result?.days,
    ageInSeconds
  );

  // === Shareable Message ===
  const shareMessage = `I'm ${result?.years} years, ${result?.months} months, and ${result?.days} days old!`;
  const shareUrl = `${baseUrl}`;

  return (
    <div className="w-3/4 max-w-6xl mx-auto px-4 py-8">
      {/* === Confetti Birthday Banner === */}
      {showConfetti && (
        <>
          <Confetti />
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white font-bold text-3xl md:text-5xl px-6 py-4 rounded-2xl shadow-2xl animate-bounce transition-all duration-700">
              🎉 Happy Birthday! 🎂
            </div>
          </div>
        </>
      )}

      {/* === Header with Theme Toggle === */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600">
          <CalendarDays className="inline-block w-7 h-7 mr-2 animate-pulse" />
          Age Calculator
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <SunMoon className="w-6 h-6" />
        </button>
      </div>

      {/* === Input Form === */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-500">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-600 dark:text-gray-200 font-semibold">
            Select Your Date of Birth:
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2"
            required
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white rounded-lg py-2 px-4 font-semibold hover:bg-indigo-600 transition duration-300"
          >
            Calculate Age
          </button>
        </form>
      </div>

      {/* === Result Section === */}
      {showResults && result && (
        <div className="mt-10 animate-fadeInUp opacity-100 animate-fill-forwards">
          <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-gray-800 dark:text-white rounded-2xl shadow-xl p-6 space-y-8">
            <p className="text-xl font-bold text-center text-indigo-600 dark:text-indigo-300">
              <Timer className="inline-block w-6 h-6 mr-2" /> Your Age Insights
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-in-out">
              {/* Age Insights Component */}
              <div>
                <AgeInsights
                  result={result}
                  dayOfWeek={dayOfWeek}
                  ageInSeconds={ageInSeconds}
                />
              </div>

              {/* Zodiac & Rashi Component */}
              <div>
                <ZodiacInsights
                  dob={dob}
                  zodiac={zodiac}
                  rashi={rashi}
                  element={element}
                  daysToBirthday={daysToBirthday}
                  leapYear={leap}
                />
              </div>

              {/* Health Suggestion Component */}
              <div>
                <HealthInsights health={health} />
              </div>
            </div>
          </div>

          {/* === Historical Highlights Section === */}
          <HistoricHighlights
            events={historicEvents}
            births={birthFigures}
            loading={loadingEvents}
          />

          {/* === PDF & Share Actions Section === */}
          <div className="mt-8">
            <ReportActions
              dob={dob}
              result={result}
              ageInSeconds={ageInSeconds}
              zodiac={zodiac}
              rashi={rashi}
              element={element}
              leapYear={leap}
              health={health}
              events={historicEvents}
              births={birthFigures}
              message={shareMessage}
              url={shareUrl}
              dayofWeek={dayOfWeek}
            />
          </div>
        </div>
      )}
    </div>
  );
}
