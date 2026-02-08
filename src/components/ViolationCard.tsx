import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Violation } from '../types/fine';
import { categoryLabels, categoryColors } from '../data/violations';

interface ViolationCardProps {
  violation: Violation;
  count: number;
  onAdd: (violation: Violation) => void;
  onRemove: (violationId: string) => void;
}

const ViolationCard: React.FC<ViolationCardProps> = ({
  violation,
  count,
  onAdd,
  onRemove,
}) => {
  const colorClass = categoryColors[violation.category] || '';

  return (
    <div
      className={`border rounded-lg p-4 transition-all ${
        count > 0
          ? 'border-blue-400 bg-blue-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-gray-900">{violation.name}</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${colorClass}`}
            >
              {categoryLabels[violation.category]}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{violation.description}</p>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">{violation.section}</span>
            <span className="font-medium text-gray-900">
              ₹{violation.fineAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {count > 0 && (
            <button
              onClick={() => onRemove(violation.id)}
              aria-label={`Remove ${violation.name}`}
              className="w-8 h-8 flex items-center justify-center rounded-full
                border border-red-300 text-red-600 hover:bg-red-50
                transition-colors"
            >
              <Minus size={16} />
            </button>
          )}
          {count > 0 && (
            <span
              className="w-8 text-center font-semibold text-blue-700"
              aria-label={`${violation.name} selected ${count} times`}
            >
              {count}
            </span>
          )}
          <button
            onClick={() => onAdd(violation)}
            aria-label={`Add ${violation.name}`}
            className="w-8 h-8 flex items-center justify-center rounded-full
              border border-blue-300 text-blue-600 hover:bg-blue-50
              transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViolationCard;
