import React from "react";
import { SunMoon } from "lucide-react";

// ZodiacInsights Component
// Displays astrological information such as Zodiac sign, Hindu rashi, element, days until birthday, and next leap year.
// Props:
// - zodiac: Western zodiac sign
// - rashi: Hindu astrological sign
// - element: Element associated with the rashi (e.g., fire, water)
// - daysToBirthday: Days remaining until the user's next birthday
// - leapYear: Next leap year after user's birth year or current year

const ZodiacInsights = ({ zodiac, rashi, element, daysToBirthday, leapYear }) => {
  // Dynamically determine the image path based on the zodiac sign
  const zodiacImage = zodiac
    ? `/images/zodiac/${zodiac.toLowerCase()}.png`
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-inner h-full flex flex-col justify-between border-l-4 border-purple-500">
      
      {/* Responsive layout for text and image */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
        
        {/* Left Section - Text and Image */}
        <div className="lg:w-2/3 text-center lg:text-left">
          
          {/* Title with icon */}
          <p className="font-semibold text-purple-600 dark:text-purple-300 mb-2">
            <SunMoon className="inline w-4 h-4 mr-1" /> Zodiac Details
          </p>

          {/* Render zodiac image if available */}
          {zodiacImage && (
            <div className="flex justify-center mb-3">
              <div className="bg-white rounded-full p-3 shadow-md border border-gray-300 dark:border-gray-600">
                <img
                  src={zodiacImage}
                  alt={`${zodiac} sign`}
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          )}

          {/* Details list */}
          <ul className="pl-4 space-y-1 text-sm text-gray-800 dark:text-gray-200">
            <li>
              <strong>Western Zodiac:</strong> {zodiac}
              {/* Show Hindu zodiac (rashi) in a lighter style */}
              <span className="italic text-gray-500 dark:text-gray-400"> ({rashi})</span>
            </li>
            <li><strong>Hindu Zodiac Element:</strong> {element}</li>
            <li><strong>Days Until Next Birthday:</strong> {daysToBirthday}</li>
            <li><strong>Next Leap Year:</strong> {leapYear}</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ZodiacInsights;
