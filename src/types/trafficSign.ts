export type SignCategory = 'regulatory' | 'warning' | 'informatory';

export interface TrafficSign {
  id: string;
  name: string;
  description: string;
  category: SignCategory;
  shape: string;
  color: string;
}
