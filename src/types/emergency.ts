export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  category: 'police' | 'ambulance' | 'fire' | 'helpline' | 'roadside';
  isNational: boolean;
}

export interface StateEmergencyInfo {
  stateCode: string;
  stateName: string;
  contacts: EmergencyContact[];
}
