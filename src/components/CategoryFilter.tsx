import React from 'react';
import { ViolationCategory } from '../types/fine';
import { categoryLabels } from '../data/violations';

interface CategoryFilterProps {
  selected: ViolationCategory | 'all';
  onChange: (category: ViolationCategory | 'all') => void;
}

const categories: Array<ViolationCategory | 'all'> = [
  'all',
  'documentation',
  'safety',
  'traffic',
  'dui',
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selected,
  onChange,
}) => {
  return (
    <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          role="radio"
          aria-checked={selected === cat}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === cat
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
          }`}
        >
          {cat === 'all' ? 'All' : categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
