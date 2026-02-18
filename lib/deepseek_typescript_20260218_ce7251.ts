export type CaseStatus = 
  | 'pending' 
  | 'investigation' 
  | 'court-proceedings' 
  | 'closed' 
  | 'compensation-paid'
  | 'unresolved';

export type CaseCategory = 
  | 'Farmers'
  | 'Political Accountability'
  | 'Violent Crime'
  | 'Accidents'
  | 'Drunk Driving'
  | 'Corruption'
  | 'Social Justice'
  | 'Governance Failure';

export type TimelineEvent = {
  date: string; // ISO date
  title: string;
  description: string;
  source?: string;
};

export type GovernmentResponse = {
  announcements: string[];
  compensation?: string;
  officialStatements: string[];
  filedFIR?: boolean;
  arrests?: number;
  chargesheetFiled?: boolean;
};

export type Case = {
  id: string;
  title: string;
  slug: string;
  category: CaseCategory;
  location: string; // District or specific location in Telangana
  dateOfIncident: string; // ISO date
  lastUpdated: string; // ISO date
  summary: string;
  detailedSummary: string;
  status: CaseStatus;
  timeline: TimelineEvent[];
  governmentResponse: GovernmentResponse;
  legalStatus: string; // e.g., "FIR registered", "Trial in progress"
  compensationAnnounced?: string; // Amount if any
  isClosed: boolean;
  images?: string[]; // URLs to public domain images
  tags: string[];
  // Admin-only fields (not exposed via public API)
  internalNotes?: string;
  sources?: string[]; // For reference tracking
};