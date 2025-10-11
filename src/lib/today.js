// lib/date.js
export function pad(n){ return String(n).padStart(2, "0"); }

/**
 * Returns deterministic date parts & strings in the specified timeZone.
 * Defaults to Asia/Kolkata so client+server get the same day.
 */
export function getDateParts(date = new Date(), timeZone = "Asia/Kolkata") {
  // Try Intl.formatToParts (clean and timezone-aware)
  try {
    const opts = { timeZone, day: "2-digit", month: "2-digit", year: "numeric" };
    const parts = new Intl.DateTimeFormat("en-GB", opts).formatToParts(date);
    const day = parts.find(p => p.type === "day").value;
    const month = parts.find(p => p.type === "month").value;
    const year = parts.find(p => p.type === "year").value;
    return {
      day,
      month,
      year,
      // ISO for storage/comparison, display for UI
      iso: `${year}-${month}-${day}`,
      display: `${day}-${month}-${year}`,
    };
  } catch (err) {
    // Fallback: compute IST manually (works if Intl with timezone unsupported)
    const utcMs = date.getTime() + (date.getTimezoneOffset() * 60000);
    const istMs = utcMs + (5.5 * 60 * 60 * 1000); // +5:30 hours
    const d = new Date(istMs);
    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    return { day, month, year, iso: `${year}-${month}-${day}`, display: `${day}-${month}-${year}` };
  }
}

export default function today(timeZone = "Asia/Kolkata") {
  return getDateParts(new Date(), timeZone).display;
}
