export const EXPORT_FORMAT_OPTIONS = [
  { value: "xlsx", label: "Excel (.xlsx)" },
  { value: "csv", label: "CSV (.csv)" },
] as const;

export const DATE_FORMAT_OPTIONS = [
  { value: "mm-dd-yyyy", label: "MM/DD/YYYY" },
  { value: "dd-mm-yyyy", label: "DD/MM/YYYY" },
  { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
] as const;

// Representative subset — replace with a full IANA time zone list when
// wiring this up for real (e.g. via Intl.supportedValuesOf("timeZone")).
export const TIME_ZONE_OPTIONS = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time (US)" },
  { value: "America/Chicago", label: "Central Time (US)" },
  { value: "America/Denver", label: "Mountain Time (US)" },
  { value: "America/Los_Angeles", label: "Pacific Time (US)" },
  { value: "Europe/London", label: "London" },
  { value: "Asia/Kolkata", label: "India Standard Time" },
] as const;