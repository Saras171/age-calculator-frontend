import React from "react";

// Functional component that displays historical events and notable births for the user's birthdate
const HistoricHighlights = ({ events, births, loading }) => (
  <div className="mt-6">
    {/* Section Header */}
    <h2 className="text-xl font-bold text-indigo-600 mb-4">
      🌐 Historic Highlights
    </h2>

    {/* Loading state while historical data is being fetched */}
    {loading && (
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 animate-pulse mb-4">
        Fetching historical data...
      </p>
    )}

    {/* Content Grid: Splits into two columns on medium screens and above */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Historical Events Section */}
      {events?.length > 0 && (
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-md">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
            📜 Major Events on Your Birthday:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-800 dark:text-white">
            {events.map((e, idx) => (
              <li key={idx}>
                <strong>{e.year}:</strong> {e.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Famous Birthdays Section */}
      {births?.length > 0 && (
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-md">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            🎉 Famous People Born on This Day:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-800 dark:text-white">
            {births.map((b, idx) => (
              <li key={idx}>
                <strong>{b.year}:</strong> {b.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export default HistoricHighlights;
