// Calculate western zodiac sign based on birth date
export const getZodiacSign = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;

  // Each array entry: [ZodiacName, DayUntilNextZodiac]
  const zodiac = [
    ["Capricorn", 20], ["Aquarius", 19], ["Pisces", 20], ["Aries", 20],
    ["Taurus", 21], ["Gemini", 21], ["Cancer", 22], ["Leo", 22],
    ["Virgo", 22], ["Libra", 23], ["Scorpio", 23], ["Sagittarius", 21],
    ["Capricorn", 31], // Capricorn wraps around end of year
  ];

  // Defensive check in case of invalid month index
  if (!zodiac[month - 1] || !zodiac[month]) return ""; 

  // Determine zodiac sign based on threshold day
  return day < zodiac[month - 1][1] ? zodiac[month - 1][0] : zodiac[month][0];
};

// Map western zodiac to corresponding Hindu Rashi
export const getHinduRashi = (dob) => {
  const zodiac = getZodiacSign(dob);
  const rashiMap = {
    Aries: "Mesha",
    Taurus: "Vrishabha",
    Gemini: "Mithuna",
    Cancer: "Karka",
    Leo: "Simha",
    Virgo: "Kanya",
    Libra: "Tula",
    Scorpio: "Vrishchika",
    Sagittarius: "Dhanu",
    Capricorn: "Makara",
    Aquarius: "Kumbha",
    Pisces: "Meena"
  };

  return rashiMap[zodiac]; // Returns undefined if zodiac is invalid
};

// Determine Hindu zodiac element based on birth year (cyclical pattern)
export const getHinduZodiacElement = (date) => {
  const year = new Date(date).getFullYear();
  const elements = ["Fire", "Earth", "Air", "Water"];
  return elements[year % 4]; // Simple 4-element cyclic mapping
};

// Calculate days remaining until the next birthday
export const timeUntilNextBirthday = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  
  // Set next birthday in the current year
  const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  // If the birthday has already passed this year, use the next year
  if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);

  // Return difference in days
  return Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
};

// Calculate the next upcoming leap year
export const nextLeapYear = () => {
  let year = new Date().getFullYear();

  // Leap year rule: divisible by 4 and (not divisible by 100 unless divisible by 400)
  while (!(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) {
    year++;
  }

  return year;
};

// Estimate basic health metrics using age or seconds lived
export const healthInsights = (years = 0, months = 0, days = 0, seconds = null) => {
  // Compute total minutes lived from seconds or estimated from age
  const totalMinutes = seconds
    ? seconds / 60
    : ((years * 365.25 + months * 30.44 + days) * 24 * 60);

  const bpm = 72; // Average resting heart rate

  return {
    // Sleep recommendation based on age group
    sleep: years < 18 ? 9 : years < 60 ? 8 : 7,

    // Estimated total heartbeats till now
    heartbeats: totalMinutes * bpm,

    // Earth revolutions (i.e., full years lived)
    earthRevolutions: years + months / 12 + days / 365.25,
  };
};
