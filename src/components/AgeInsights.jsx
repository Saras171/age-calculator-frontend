import React from "react";
import { Clock, CalendarCheck } from "lucide-react";

// Functional component that receives age result, live seconds counter, and day of the week
const AgeInsights = ({ result, ageInSeconds, dayOfWeek }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-inner h-full flex flex-col justify-between border-l-4 border-indigo-500">
    {/* Container with adaptive theming, spacing, border styling for a polished UI block */}

    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
      {/* Responsive layout: switches from vertical on small screens to horizontal on large screens */}

      {/* Age summary and live age tracker section */}
      <div className="lg:w-2/3 text-center lg:text-left">
        <p className="font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
          <Clock className="inline w-4 h-4 mr-1" /> Chronological Age
        </p>

        {/* Chronological age details in various time units */}
        <ul className="pl-4 space-y-1 text-sm">
          <li><strong>Years:</strong> {result.years}</li>
          <li><strong>Months:</strong> {result.months}</li>
          <li><strong>Days:</strong> {result.days}</li>
          <li><strong>Live Seconds:</strong> {ageInSeconds}</li>
          <li><strong>Minutes:</strong> {Math.floor(ageInSeconds / 60)}</li>
          <li><strong>Hours:</strong> {Math.floor(ageInSeconds / 3600)}</li>
          <li><strong>Weeks:</strong> {Math.floor(ageInSeconds / (60 * 60 * 24 * 7))}</li>
          <li><strong>Milliseconds:</strong> {ageInSeconds * 1000}</li>

          {/* Optional display of day of birth if available */}
          {dayOfWeek && (
            <li className="mt-2 text-indigo-700 dark:text-indigo-300 font-semibold flex items-center">
              <CalendarCheck className="inline w-4 h-4 mr-1" /> Born on: {dayOfWeek}
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>
);

export default AgeInsights;
