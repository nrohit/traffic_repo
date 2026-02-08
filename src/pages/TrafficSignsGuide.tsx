import React, { useState, useMemo } from 'react';
import { ArrowLeft, ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignCategory } from '../types/trafficSign';
import {
  trafficSigns,
  signCategoryLabels,
  signCategoryColors,
} from '../data/trafficSigns';
import SearchBar from '../components/SearchBar';

const categoryIcons: Record<SignCategory, React.ReactNode> = {
  regulatory: <ShieldAlert size={20} className="text-red-600" />,
  warning: <AlertTriangle size={20} className="text-amber-600" />,
  informatory: <Info size={20} className="text-blue-600" />,
};

const TrafficSignsGuide: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    SignCategory | 'all'
  >('all');

  const filteredSigns = useMemo(() => {
    return trafficSigns.filter((sign) => {
      const matchesCategory =
        selectedCategory === 'all' || sign.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const categories: Array<SignCategory | 'all'> = [
    'all',
    'regulatory',
    'warning',
    'informatory',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700"
              aria-label="Back to home"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Traffic Signs Guide
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Learn about Indian traffic signs — regulatory, warning, and
                informatory
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search traffic signs..."
        />

        <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Filter by sign category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              role="radio"
              aria-checked={selectedCategory === cat}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {cat === 'all' ? 'All Signs' : signCategoryLabels[cat]}
            </button>
          ))}
        </div>

        {filteredSigns.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No signs found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSigns.map((sign) => (
              <div
                key={sign.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  {categoryIcons[sign.category]}
                  <h3 className="font-semibold text-gray-900">{sign.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {sign.description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      signCategoryColors[sign.category]
                    }`}
                  >
                    {signCategoryLabels[sign.category]}
                  </span>
                  <span className="text-xs text-gray-500">
                    {sign.shape} — {sign.color}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TrafficSignsGuide;
