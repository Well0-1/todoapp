export const PRIORITIES = [
  { value: "low", label: "Low", variant: "secondary" },
  { value: "medium", label: "Medium", variant: "outline" },
  { value: "high", label: "High", variant: "destructive" },
] as const;

export const CATEGORIES = [
  { value: "personal", label: "Personal", variant: "default" },
  { value: "work", label: "Work", variant: "secondary" },
  { value: "health", label: "Health", variant: "outline" },
  { value: "shopping", label: "Shopping", variant: "destructive" },
] as const;
