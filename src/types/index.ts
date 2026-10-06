export type RiskLevel = 'safe' | 'caution' | 'risk';

export interface Clause {
  id: string;
  riskLevel: RiskLevel;
  title: string;
  originalSnippet: string;
  spokenExplanation: string;
  whyItMatters: string;
  actionTip: string;
  category?: 'deduction' | 'penalty' | 'incentive' | 'deactivation' | 'waiting' | 'insurance' | 'general';
}

export interface FinancialImpact {
  deductions: string[];
  incentives: string[];
  penalties: string[];
  netTakeaway: string;
}

export interface GrievanceTemplate {
  subject: string;
  body: string;
}

export interface AnalysisResult {
  id: string;
  documentType: string;
  platformName: string;
  overallRiskScore: RiskLevel;
  headline: string;
  spokenSummary: string;
  financialImpact: FinancialImpact;
  clauses: Clause[];
  workerAdvice: string[];
  grievanceTemplate: GrievanceTemplate;
  whatsAppSummary: string;
  analyzedAt: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  spokenLabel: string;
  voiceLangCode: string;
  sampleGreeting: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
