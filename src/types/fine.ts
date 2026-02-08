export type ViolationCategory = 'documentation' | 'safety' | 'traffic' | 'dui';

export interface Violation {
  id: string;
  name: string;
  description: string;
  category: ViolationCategory;
  fineAmount: number;
  section: string;
  isCompoundable: boolean;
}

export interface SelectedViolation {
  violation: Violation;
  count: number;
}

export interface FineSummary {
  violations: SelectedViolation[];
  totalFine: number;
  totalViolationCount: number;
}
