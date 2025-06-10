// Import necessary components from React and react-pdf/renderer
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register the Roboto font in multiple weights and styles
// This ensures consistent, web-safe typography throughout the PDF
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf", // Regular
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu51xIIzc.ttf", // Italic
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf", // Bold
      fontWeight: "bold",
      fontStyle: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TjASc6CsE.ttf", // Bold Italic
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

// Define custom PDF styles using react-pdf's StyleSheet.create
const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 11,
    fontFamily: "Roboto",
    lineHeight: 1.6,
    color: "#212121",
    backgroundColor: "#fdfdfd",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 8,
    borderBottom: "1pt solid #cfd8dc",
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
    color: "#0d47a1",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "bold",
    color: "#1a237e",
    borderBottom: "1pt solid #90a4ae",
    paddingBottom: 3,
  },
  line: {
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    color: "#424242",
  },
  value: {
    fontStyle: "italic",
    color: "#37474f",
  },
  bullet: {
    marginLeft: 8,
    marginBottom: 3,
  },
});

// Main PDF component that receives dynamic props to render user-specific report
const AgeReportPDF = ({
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
  dayofWeek
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header / Title */}
      <Text style={styles.header}>Age Calculator Report</Text>

      {/* Section 1: Personal Information */}
      <View style={styles.section}>
        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Date of Birth:</Text>{" "}
          <Text style={styles.value}>{dob}</Text>
        </Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Age:</Text>{" "}
          <Text style={styles.value}>
            {result?.years} years, {result?.months} months, {result?.days} days
          </Text>
        </Text>
           <Text style={styles.line}>
          <Text style={styles.label}>Day of Week Born:</Text>{" "}
          <Text style={styles.value}>{dayofWeek}</Text>
        </Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Seconds Lived:</Text>{" "}
          <Text style={styles.value}>{ageInSeconds}</Text>
        </Text>
      </View>

      {/* Section 2: Zodiac and Astrology */}
      <View style={styles.section}>
        <Text style={styles.title}>Zodiac & Astrology</Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Western Zodiac:</Text>{" "}
          <Text style={styles.value}>{zodiac}</Text>
        </Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Hindu Rashi:</Text>{" "}
          <Text style={styles.value}>{rashi}</Text>
        </Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Zodiac Element:</Text>{" "}
          <Text style={styles.value}>{element}</Text>
        </Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Next Birthday In:</Text>{" "}
          <Text style={styles.value}>{timeUntilBirthday(dob)} days</Text>
        </Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Next Leap Year:</Text>{" "}
          <Text style={styles.value}>{leapYear}</Text>
        </Text>
      </View>

      {/* Section 3: Health Insights */}
      <View style={styles.section}>
        <Text style={styles.title}>Health Insights</Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Ideal Sleep:</Text>{" "}
          <Text style={styles.value}>{health.sleep} hrs/day</Text>
        </Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Approx. Heartbeats:</Text>{" "}
          <Text style={styles.value}>{Math.floor(health.heartbeats)}</Text>
        </Text>
        <Text style={styles.line}>
          <Text style={styles.label}>Earth Revolutions:</Text>{" "}
          <Text style={styles.value}>
            {health.earthRevolutions.toFixed(2)}
          </Text>
        </Text>
      </View>

      {/* Section 4: Historical Events */}
      {events?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.title}>Historic Events on Your Birthday</Text>
          {events.map((e, idx) => (
            <Text key={idx} style={styles.bullet}>
              • {e.year}: {e.text}
            </Text>
          ))}
        </View>
      )}

      {/* Section 5: Famous Births */}
      {births?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.title}>Famous People Born on This Day</Text>
          {births.map((b, idx) => (
            <Text key={idx} style={styles.bullet}>
              • {b.year}: {b.text}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

// Helper function to calculate number of days until next birthday
function timeUntilBirthday(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // If birthday this year already passed, use next year
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  // Return number of days left
  const diff = nextBirthday - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default AgeReportPDF;
