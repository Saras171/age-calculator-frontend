import React from "react";
import { FileText } from "lucide-react"; // Icon for PDF download
import { PDFDownloadLink } from "@react-pdf/renderer"; // Component to generate PDF in browser
import AgeReportPDF from "../pdf/AgeReportPdf"; // Custom PDF document component
import ShareButtons from "./ShareButton"; // Reusable social sharing button component

// ReportActions Component
// Provides user actions such as downloading the age report PDF and sharing the report link
const ReportActions = ({
  dob,
  result,
  ageInSeconds,
  zodiac,
  rashi,
  element,
  leapYear,
  health,
  events,
  births,
  message,
  url,
  dayofWeek
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Action buttons layout */}
      <div className="flex flex-wrap justify-center gap-4">

        {/* PDF Download Button */}
        <PDFDownloadLink
          // Generate the PDF using the AgeReportPDF component
          document={
            <AgeReportPDF
              dob={dob}
              result={result}
              ageInSeconds={ageInSeconds}
              zodiac={zodiac}
              rashi={rashi}
              element={element}
              leapYear={leapYear}
              health={health}
              events={events}
              births={births}
              dayofWeek={dayofWeek}
            />
          }
          fileName="Age_Report.pdf" // Name of the downloaded file
          className="h-10 flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-purple-800 transition duration-300 text-sm"
        >
          {/* Conditional rendering inside the download button */}
          {({ loading }) =>
            loading ? (
              "Generating PDF..." // Show while PDF is being prepared
            ) : (
              <>
                <FileText className="inline w-4 h-4 mr-1" />
                Download PDF
              </>
            )
          }
        </PDFDownloadLink>

        {/* Share Button for social or custom sharing */}
        <ShareButtons message={message} url={url} />
      </div>
    </div>
  );
};

export default ReportActions;
