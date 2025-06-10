

export async function fetchHistoricalEvents(month, day) {
  try {
    const res = await fetch(`https://history.muffinlabs.com/date/${month}/${day}`);
    const data = await res.json();
    const allEvents = data.data.Events || [];

    // Sort chronologically: Ancient → Modern
    const sortedEvents = allEvents.sort((a, b) => parseInt(a.year) - parseInt(b.year));

    // Filter out vague, negative or violent content unless user explicitly wants all
    const clean = sortedEvents.filter(e =>
      !/massacre|murder|died|killed|war|battle|assassinated|bomb|invasion|executed|explosion/i.test(e.text)
    );

    // Return top 8 sorted (oldest to newest)
    return clean.slice(0, 8);
  } catch (err) {
    console.error("Failed to fetch historical events:", err);
    return [];
  }
}

// famous Persons born on same date and month
export async function fetchHistoricalBirths(month, day) {
  try {
    const res = await fetch(`https://history.muffinlabs.com/date/${month}/${day}`);
    const data = await res.json();
    return (data.data.Births || []).slice(0, 10);
  } catch (err) {
    console.error("Failed to fetch historical births:", err);
    return [];
  }
}
