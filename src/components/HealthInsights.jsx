import React from "react";
import { Info } from "lucide-react"; // Icon used for section heading

// Functional component that displays health-related insights based on user's age
const HealthInsights = ({ health }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-inner h-full border-l-4 border-green-500">
    {/* Card container with light/dark theme support, left border for section highlight */}

    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
      {/* Responsive flex layout: column on small screens, row on large screens */}

      {/* Main content block */}
      <div className="lg:w-2/3 text-center lg:text-left">
        {/* Section title with icon */}
        <p className="font-semibold text-green-600 dark:text-green-300 mb-2">
          <Info className="inline w-4 h-4 mr-1" /> Health & Life Insights
        </p>

        {/* Decorative or illustrative image */}
        <div className="flex justify-center mb-3">
          <div className="bg-white rounded-full p-3 shadow-md border border-gray-300 dark:border-gray-600">
            <img
              src="/images/healthcare.png"
              alt="Healthcare Illustration"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* Health-related calculated metrics list */}
        <ul className="pl-4 space-y-1 text-sm text-gray-800 dark:text-gray-200">
          <li><strong>Ideal Sleep:</strong> {health.sleep} hrs/day</li>
          <li><strong>Heartbeats (approx):</strong> {Math.floor(health.heartbeats)}</li>
          <li><strong>Earth Revolutions:</strong> {health.earthRevolutions.toFixed(2)}</li>
        </ul>
      </div>
    </div>
  </div>
);

export default HealthInsights;
