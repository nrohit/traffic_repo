import React, { useState } from 'react';
import { ArrowLeft, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  nationalContacts,
  stateEmergencyData,
  contactCategoryLabels,
  contactCategoryColors,
} from '../data/emergencyContacts';
import { EmergencyContact } from '../types/emergency';

const ContactCard: React.FC<{ contact: EmergencyContact }> = ({ contact }) => (
  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <h3 className="font-medium text-gray-900 text-sm">{contact.name}</h3>
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full ${
            contactCategoryColors[contact.category]
          }`}
        >
          {contactCategoryLabels[contact.category]}
        </span>
      </div>
      <p className="text-xs text-gray-500">{contact.description}</p>
    </div>
    <a
      href={`tel:${contact.number}`}
      className="flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white
        rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shrink-0 ml-3"
      aria-label={`Call ${contact.name} at ${contact.number}`}
    >
      <Phone size={14} />
      {contact.number}
    </a>
  </div>
);

const EmergencyContacts: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');

  const stateData = stateEmergencyData.find(
    (s) => s.stateCode === selectedState
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-600">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-red-200 hover:text-white"
              aria-label="Back to home"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Emergency Contacts
              </h1>
              <p className="text-sm text-red-100 mt-0.5">
                One-touch dialing for police, ambulance, fire, and roadside
                assistance
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* National emergency numbers */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            National Emergency Numbers
          </h2>
          <div className="space-y-2">
            {nationalContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </section>

        {/* State selector */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin size={20} />
            State-Specific Contacts
          </h2>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            aria-label="Select state"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select a state...</option>
            {stateEmergencyData.map((state) => (
              <option key={state.stateCode} value={state.stateCode}>
                {state.stateName}
              </option>
            ))}
          </select>

          {stateData && (
            <div className="mt-3 space-y-2">
              {stateData.contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          )}

          {selectedState && !stateData && (
            <p className="text-gray-500 text-center py-4">
              No data available for this state.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default EmergencyContacts;
