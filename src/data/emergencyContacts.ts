import { EmergencyContact, StateEmergencyInfo } from '../types/emergency';

export const nationalContacts: EmergencyContact[] = [
  {
    id: 'nat-1',
    name: 'Police',
    number: '100',
    description: 'National police emergency helpline',
    category: 'police',
    isNational: true,
  },
  {
    id: 'nat-2',
    name: 'Ambulance',
    number: '108',
    description: 'National emergency ambulance service',
    category: 'ambulance',
    isNational: true,
  },
  {
    id: 'nat-3',
    name: 'Fire Brigade',
    number: '101',
    description: 'National fire emergency helpline',
    category: 'fire',
    isNational: true,
  },
  {
    id: 'nat-4',
    name: 'Emergency Response (ERSS)',
    number: '112',
    description: 'Unified emergency response support system for all emergencies',
    category: 'helpline',
    isNational: true,
  },
  {
    id: 'nat-5',
    name: 'Women Helpline',
    number: '1091',
    description: 'National helpline for women in distress',
    category: 'helpline',
    isNational: true,
  },
  {
    id: 'nat-6',
    name: 'Road Accident Emergency',
    number: '1073',
    description: 'National highway accident emergency service',
    category: 'roadside',
    isNational: true,
  },
  {
    id: 'nat-7',
    name: 'Tourist Helpline',
    number: '1363',
    description: 'Helpline for tourists needing assistance',
    category: 'helpline',
    isNational: true,
  },
];

export const stateEmergencyData: StateEmergencyInfo[] = [
  {
    stateCode: 'DL',
    stateName: 'Delhi',
    contacts: [
      { id: 'dl-1', name: 'Delhi Traffic Police', number: '011-25844444', description: 'Delhi traffic police control room', category: 'police', isNational: false },
      { id: 'dl-2', name: 'Delhi Police Control Room', number: '100', description: 'Delhi police emergency', category: 'police', isNational: false },
      { id: 'dl-3', name: 'CATS Ambulance', number: '102', description: 'Centralized Accident & Trauma Services', category: 'ambulance', isNational: false },
      { id: 'dl-4', name: 'Highway Patrol', number: '1033', description: 'Delhi highway patrol assistance', category: 'roadside', isNational: false },
    ],
  },
  {
    stateCode: 'MH',
    stateName: 'Maharashtra',
    contacts: [
      { id: 'mh-1', name: 'Maharashtra Highway Police', number: '1800-233-4466', description: 'Highway police helpline (toll-free)', category: 'police', isNational: false },
      { id: 'mh-2', name: 'Mumbai Traffic Police', number: '022-24937747', description: 'Mumbai traffic police control room', category: 'police', isNational: false },
      { id: 'mh-3', name: 'Ambulance (Maharashtra)', number: '108', description: 'State ambulance service', category: 'ambulance', isNational: false },
      { id: 'mh-4', name: 'Pune Traffic Police', number: '020-26126296', description: 'Pune traffic police helpline', category: 'police', isNational: false },
    ],
  },
  {
    stateCode: 'KA',
    stateName: 'Karnataka',
    contacts: [
      { id: 'ka-1', name: 'Bangalore Traffic Police', number: '080-22942222', description: 'Bangalore traffic police control room', category: 'police', isNational: false },
      { id: 'ka-2', name: 'Karnataka State Police', number: '100', description: 'State police helpline', category: 'police', isNational: false },
      { id: 'ka-3', name: 'Ambulance (Karnataka)', number: '108', description: 'State emergency ambulance', category: 'ambulance', isNational: false },
    ],
  },
  {
    stateCode: 'TN',
    stateName: 'Tamil Nadu',
    contacts: [
      { id: 'tn-1', name: 'Chennai Traffic Police', number: '044-23452350', description: 'Chennai traffic police helpline', category: 'police', isNational: false },
      { id: 'tn-2', name: 'TN Highway Patrol', number: '1073', description: 'Tamil Nadu highway patrol', category: 'roadside', isNational: false },
      { id: 'tn-3', name: 'Ambulance (Tamil Nadu)', number: '108', description: 'State ambulance service', category: 'ambulance', isNational: false },
    ],
  },
  {
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
    contacts: [
      { id: 'up-1', name: 'UP Traffic Police', number: '0512-2581439', description: 'UP traffic police control room', category: 'police', isNational: false },
      { id: 'up-2', name: 'UP Dial 112', number: '112', description: 'Unified emergency response', category: 'helpline', isNational: false },
      { id: 'up-3', name: 'Ambulance (UP)', number: '108', description: 'State ambulance service', category: 'ambulance', isNational: false },
    ],
  },
  {
    stateCode: 'RJ',
    stateName: 'Rajasthan',
    contacts: [
      { id: 'rj-1', name: 'Rajasthan Traffic Police', number: '0141-2744778', description: 'Rajasthan traffic police helpline', category: 'police', isNational: false },
      { id: 'rj-2', name: 'Ambulance (Rajasthan)', number: '108', description: 'State ambulance service', category: 'ambulance', isNational: false },
      { id: 'rj-3', name: 'Highway Rescue', number: '1073', description: 'Highway accident rescue', category: 'roadside', isNational: false },
    ],
  },
  {
    stateCode: 'GJ',
    stateName: 'Gujarat',
    contacts: [
      { id: 'gj-1', name: 'Gujarat Traffic Police', number: '079-25501100', description: 'Gujarat traffic police helpline', category: 'police', isNational: false },
      { id: 'gj-2', name: 'Ambulance (Gujarat)', number: '108', description: 'State emergency ambulance (GVK EMRI)', category: 'ambulance', isNational: false },
      { id: 'gj-3', name: 'Highway Helpline', number: '1073', description: 'Highway accident assistance', category: 'roadside', isNational: false },
    ],
  },
  {
    stateCode: 'WB',
    stateName: 'West Bengal',
    contacts: [
      { id: 'wb-1', name: 'Kolkata Traffic Police', number: '033-22143230', description: 'Kolkata traffic police control room', category: 'police', isNational: false },
      { id: 'wb-2', name: 'Ambulance (West Bengal)', number: '108', description: 'State ambulance service', category: 'ambulance', isNational: false },
    ],
  },
];

export const contactCategoryLabels: Record<string, string> = {
  police: 'Police',
  ambulance: 'Ambulance',
  fire: 'Fire',
  helpline: 'Helpline',
  roadside: 'Roadside',
};

export const contactCategoryColors: Record<string, string> = {
  police: 'bg-blue-100 text-blue-800',
  ambulance: 'bg-red-100 text-red-800',
  fire: 'bg-orange-100 text-orange-800',
  helpline: 'bg-green-100 text-green-800',
  roadside: 'bg-amber-100 text-amber-800',
};
