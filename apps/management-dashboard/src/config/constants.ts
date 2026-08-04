export const DEPARTMENTS: string[] = [];

export const setDepartments = (departments: string[]) => {
  DEPARTMENTS.length = 0;
  DEPARTMENTS.push(...departments);
};

export const INCIDENT_CATEGORIES = [
  'First Aid',
  'MTC',
  'LTI',
  'RWC',
  'Fatality',
  'Minor Fire',
  'Significant Near Miss'
];

export const HAZARD_CATEGORIES = [
  'Electrical',
  'Fire',
  'Slip/Trip/Fall',
  'Improper Housekeeping',
  'Unauthorized Access',
  'Chemical',
  'Mechanical',
  'Behavioral',
  'Environmental'
];

export const ROOT_CAUSES = [
  'Human Error',
  'Unsafe Act',
  'Unsafe Condition',
  'Poor Housekeeping',
  'Improper PPE',
  'Equipment Failure',
  'No SOP/Procedure',
  'Training Gap'
];

export const RISK_RATINGS = [
  'Low',
  'Medium',
  'High',
  'Critical'
];

export const STATUSES = [
  'Open',
  'Closed',
  'Pending',
  'Work in Progress',
  'Cancelled'
];

export const CHART_COLORS = {
  // CBL Brand
  primary:  '#CB0017', // CBL Crimson
  maroon:   '#6E000C', // Deep Red
  dark:     '#1A1818', // Charcoal
  // Semantic enterprise palette (SAP / Microsoft Dynamics)
  danger:   '#CB0017', // Red — incidents, overdue
  warning:  '#DC8E00', // Amber — open, pending
  success:  '#1B7C1B', // Green — closed, compliant
  info:     '#2563EB', // Blue — in-progress, informational
  neutral:  '#6B7280', // Grey — neutral
  amber:    '#DC8E00', // alias for warning
  // Legacy keys (kept for compatibility)
  caramel:   '#CB0017',
  mutedGreen:'#1B7C1B',
  softGrey:  '#E5E7EB',
  darkBrown: '#1A1818',
};

// Pie chart palette — meaningful color progression
export const PIE_COLORS = [
  '#CB0017', // Red — critical / high
  '#DC8E00', // Amber — medium / open
  '#1B7C1B', // Green — low / closed
  '#2563EB', // Blue — informational
  '#6B7280', // Grey — neutral / cancelled
  '#6E000C', // Deep red — fatality-level
];
