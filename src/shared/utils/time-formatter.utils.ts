export const formatHours = (input = "") => {
  // If input is empty, return "0 hour"
  if (!input || input === "") {
    return "0 hour";
  }

  // Regex to match the hour value and "hr" part
  const regex = /^(\d+)hr$/i;
  const match = input.match(regex);

  if (match) {
    const hourValue = parseInt(match[1], 10); // Get the numeric part

    // Handle the singular case for 0
    const hourLabel = hourValue === 1 ? "hour" : "hours"; // Singular for 1, plural otherwise

    // If hour is 0, ensure it returns "0 hour" (singular)
    if (hourValue === 0) {
      return "0 hour";
    }

    return `${hourValue} ${hourLabel}`; // Return the formatted string
  }

  return "0 hour"; // Return an error message if the pattern doesn't match
};
