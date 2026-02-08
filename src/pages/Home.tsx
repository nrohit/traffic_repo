import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  SignpostBig,
  Fuel,
  Phone,
} from 'lucide-react';

interface FeatureCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  to,
  icon,
  title,
  description,
  color,
}) => (
  <Link
    to={to}
    className="block bg-white border border-gray-200 rounded-xl p-6
      hover:shadow-md hover:border-gray-300 transition-all group"
  >
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}
    >
      {icon}
    </div>
    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
      {title}
    </h2>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </Link>
);

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Indian Traffic Rules Portal
          </h1>
          <p className="text-gray-500 mt-2">
            Your one-stop solution for traffic rules, fines, emergency contacts,
            and road safety education across India.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
          Tools & Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            to="/fine-calculator"
            icon={<Calculator size={24} className="text-red-600" />}
            title="Fine Calculator"
            description="Calculate traffic violation fines as per the Motor Vehicles Act"
            color="bg-red-50"
          />
          <FeatureCard
            to="/traffic-signs"
            icon={<SignpostBig size={24} className="text-blue-600" />}
            title="Traffic Signs Guide"
            description="Learn about regulatory, warning, and informatory road signs"
            color="bg-blue-50"
          />
          <FeatureCard
            to="/trip-cost"
            icon={<Fuel size={24} className="text-green-600" />}
            title="Trip Cost Calculator"
            description="Estimate fuel cost based on distance, mileage, and fuel type"
            color="bg-green-50"
          />
          <FeatureCard
            to="/emergency"
            icon={<Phone size={24} className="text-orange-600" />}
            title="Emergency Contacts"
            description="Quick access to police, ambulance, fire, and roadside assistance"
            color="bg-orange-50"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
