export interface Question {
  id: number;
  text: string;
  answer: number | null;
}

export interface Assessment {
  disorder: string;
  confidence: number;
}