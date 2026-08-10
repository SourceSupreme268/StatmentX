export const BUG_SEVERITY_OPTIONS = [
  { value: "low", label: "Low — minor issue, doesn't block usage" },
  { value: "medium", label: "Medium — affects some functionality" },
  { value: "high", label: "High — a core feature is broken" },
  { value: "critical", label: "Critical — app is unusable" },
] as const;
