// Mock data for Project Saaransh - MCA e-consultation feedback analysis

export interface Consultation {
  id: number;
  title: string;
  status: 'Analysis Complete' | 'In Progress' | 'Completed' | 'Draft' | 'Closed';
  submissions: number;
  endDate: string;
  progress: number;
  description?: string;
  publishDate?: string;
}

export interface Comment {
  id: number;
  submitter: string;
  stakeholderType: 'Law Firm' | 'NGO' | 'Individual' | 'Industry Body' | 'Consulting Firm' | 'Government';
  date: string;
  stance: 'Supportive' | 'Opposed' | 'Concerned' | 'Alternative Proposal' | 'Request for Clarification';
  summary: string;
  qualityScore: number;
  originalText: string;
  keywords: string[];
  consultationId: number;
  language?: string;
}

export interface WordCloudData {
  text: string;
  value: number;
}

export interface TrendData {
  name: string;
  'Data Privacy Concerns': number;
  'CSR Compliance': number;
}

export interface AccessLog {
  id: number;
  date: string;
  ip: string;
  location: string;
  device: string;
}

// Mock consultations data
export const consultations: Consultation[] = [
  {
    id: 1,
    title: 'Draft Companies (Amendment) Bill, 2025',
    status: 'Analysis Complete',
    submissions: 1345,
    endDate: '2025-08-31',
    progress: 100,
    description: 'Proposed amendments to strengthen corporate governance and transparency',
    publishDate: '2025-07-15'
  },
  {
    id: 2,
    title: 'Rules on Corporate Social Responsibility (CSR)',
    status: 'In Progress',
    submissions: 782,
    endDate: '2025-09-20',
    progress: 75,
    description: 'New guidelines for CSR implementation and reporting',
    publishDate: '2025-08-01'
  },
  {
    id: 3,
    title: 'Insolvency & Bankruptcy Code (Second Amendment)',
    status: 'Completed',
    submissions: 2109,
    endDate: '2025-07-15',
    progress: 100,
    description: 'Amendments to improve the insolvency resolution process',
    publishDate: '2025-06-01'
  }
];

// Mock comments data
export const commentsData: Record<number, Comment[]> = {
  1: [
    {
      id: 101,
      submitter: 'Apex Law Associates',
      stakeholderType: 'Law Firm',
      date: '2025-08-15',
      stance: 'Opposed',
      summary: 'Argues Section 185 amendments are overly restrictive for startups and suggests a higher threshold.',
      qualityScore: 4.8,
      originalText: 'To the Ministry of Corporate Affairs,\n\nRegarding the Draft Companies (Amendment) Bill, 2025, our firm wishes to express significant concerns about the proposed changes to Section 185...',
      keywords: ['Section 185', 'Director Loans', 'Startup Financing'],
      consultationId: 1
    },
    {
      id: 102,
      submitter: 'Good Governance Foundation',
      stakeholderType: 'NGO',
      date: '2025-08-20',
      stance: 'Supportive',
      summary: 'Supports increased disclosure norms for related party transactions to enhance transparency.',
      qualityScore: 4.2,
      originalText: 'We at the Good Governance Foundation commend the Ministry for the proposed enhancements to disclosure norms...',
      keywords: ['Disclosure Norms', 'Transparency', 'Minority Shareholders'],
      consultationId: 1
    },
    {
      id: 103,
      submitter: 'Priya Sharma',
      stakeholderType: 'Individual',
      date: '2025-08-18',
      stance: 'Concerned',
      summary: 'Expresses concern about implementation of Section 145 for small businesses due to high compliance costs.',
      qualityScore: 3.5,
      originalText: 'Sir, Section 145 ka implementation aasan nahi hoga, especially small businesses ke liye. Isse compliance costs bahut badh jayenge...',
      language: 'Hinglish',
      keywords: ['Section 145', 'Small Businesses', 'Compliance Costs'],
      consultationId: 1
    },
    {
      id: 104,
      submitter: 'Federation of Indian Industries',
      stakeholderType: 'Industry Body',
      date: '2025-08-22',
      stance: 'Alternative Proposal',
      summary: 'Proposes a centralized, government-managed pool for appointing independent directors.',
      qualityScore: 4.5,
      originalText: 'While we appreciate the intent behind the new rules for independent directors, we propose an alternative mechanism...',
      keywords: ['Independent Directors', 'Centralized Pool', 'Corporate Governance'],
      consultationId: 1
    },
    {
      id: 105,
      submitter: 'ABC Consulting',
      stakeholderType: 'Consulting Firm',
      date: '2025-08-25',
      stance: 'Request for Clarification',
      summary: 'Seeks clarification on the definition of "significant beneficial owner" to avoid compliance challenges.',
      qualityScore: 4.0,
      originalText: 'We request clarification regarding the definition of "significant beneficial owner" (SBO)...',
      keywords: ['SBO', 'Clarification', 'Compliance'],
      consultationId: 1
    }
  ],
  2: [
    {
      id: 201,
      submitter: 'Green Earth Initiative',
      stakeholderType: 'NGO',
      date: '2025-09-10',
      stance: 'Supportive',
      summary: 'Supports the new CSR rules.',
      qualityScore: 4.1,
      originalText: 'The new CSR rules are a welcome change.',
      keywords: ['CSR', 'Environment'],
      consultationId: 2
    }
  ],
  3: [
    {
      id: 301,
      submitter: 'National Creditors Association',
      stakeholderType: 'Industry Body',
      date: '2025-07-10',
      stance: 'Opposed',
      summary: 'Opposes the proposed changes to the IBC.',
      qualityScore: 4.9,
      originalText: 'The proposed amendments to the IBC fundamentally weaken the position of financial creditors.',
      keywords: ['IBC', 'Creditor Rights'],
      consultationId: 3
    }
  ]
};

// Word cloud data by consultation and stance
export const wordCloudData: Record<number, Record<string, WordCloudData[]>> = {
  1: {
    'All': [
      { text: 'Director Liability', value: 95 },
      { text: 'Related Party Transactions', value: 88 },
      { text: 'Corporate Governance', value: 85 },
      { text: 'Compliance Costs', value: 75 },
      { text: 'Minority Shareholders', value: 72 },
      { text: 'Section 185', value: 68 }
    ],
    'Supportive': [
      { text: 'Transparency', value: 80 },
      { text: 'Accountability', value: 70 },
      { text: 'Minority Shareholders', value: 65 }
    ],
    'Opposed': [
      { text: 'Restrictive Conditions', value: 90 },
      { text: 'Section 185', value: 85 },
      { text: 'Startup Financing', value: 75 }
    ],
    'Concerned': [
      { text: 'Compliance Costs', value: 85 },
      { text: 'Small Businesses', value: 78 },
      { text: 'Section 145', value: 70 }
    ],
    'Alternative Proposal': [
      { text: 'Independent Directors', value: 92 },
      { text: 'Centralized Pool', value: 85 }
    ],
    'Request for Clarification': [
      { text: 'SBO', value: 88 },
      { text: 'Ambiguity', value: 80 }
    ]
  },
  2: {},
  3: {}
};

// Trend analysis data
export const trendAnalysisData: TrendData[] = [
  { name: '2021', 'Data Privacy Concerns': 230, 'CSR Compliance': 400 },
  { name: '2022', 'Data Privacy Concerns': 280, 'CSR Compliance': 350 },
  { name: '2023', 'Data Privacy Concerns': 250, 'CSR Compliance': 300 },
  { name: '2024', 'Data Privacy Concerns': 310, 'CSR Compliance': 550 },
  { name: '2025', 'Data Privacy Concerns': 450, 'CSR Compliance': 250 }
];

// Access logs data
export const accessLogs: AccessLog[] = [
  {
    id: 1,
    date: '2025-09-20 01:17:05',
    ip: '103.22.201.12',
    location: 'Delhi, India',
    device: 'Chrome on Windows'
  },
  {
    id: 2,
    date: '2025-09-19 11:45:12',
    ip: '103.22.201.12',
    location: 'Delhi, India',
    device: 'Chrome on Windows'
  },
  {
    id: 3,
    date: '2025-09-18 09:22:34',
    ip: '45.115.18.2',
    location: 'Mumbai, India',
    device: 'Safari on macOS'
  }
];

// Stance colors for consistent theming
export const STANCE_COLORS = {
  'Supportive': '#22c55e',
  'Opposed': '#ef4444',
  'Concerned': '#f97316',
  'Alternative Proposal': '#3b82f6',
  'Request for Clarification': '#a855f7'
};

export const STANCE_BG_COLORS = {
  'Supportive': 'bg-success/10 text-success border-success/20',
  'Opposed': 'bg-destructive/10 text-destructive border-destructive/20',
  'Concerned': 'bg-warning/10 text-warning border-warning/20',
  'Alternative Proposal': 'bg-info/10 text-info border-info/20',
  'Request for Clarification': 'bg-accent/10 text-accent-foreground border-accent/20'
};