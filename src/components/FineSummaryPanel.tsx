import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { SelectedViolation } from '../types/fine';

interface FineSummaryPanelProps {
  selectedViolations: SelectedViolation[];
  totalFine: number;
  onRemove: (violationId: string) => void;
  onClear: () => void;
}

const FineSummaryPanel: React.FC<FineSummaryPanelProps> = ({
  selectedViolations,
  totalFine,
  onRemove,
  onClear,
}) => {
  if (selectedViolations.length === 0) {
    return (
      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
        <AlertTriangle className="mx-auto text-gray-400 mb-2" size={32} />
        <p className="text-gray-500">
          No violations selected. Add violations from the list to calculate
          your total fine.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Fine Summary</h2>
        <button
          onClick={onClear}
          aria-label="Clear all violations"
          className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>

      <ul className="divide-y divide-gray-100" role="list">
        {selectedViolations.map(({ violation, count }) => (
          <li
            key={violation.id}
            className="flex items-center justify-between px-4 py-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {violation.name}
                {count > 1 && (
                  <span className="text-gray-500 font-normal"> x{count}</span>
                )}
              </p>
              <p className="text-xs text-gray-500">{violation.section}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm font-medium text-gray-900">
                ₹{(violation.fineAmount * count).toLocaleString('en-IN')}
              </span>
              <button
                onClick={() => onRemove(violation.id)}
                aria-label={`Remove ${violation.name}`}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <span className="text-base font-semibold text-gray-900">
          Total Fine
        </span>
        <span className="text-xl font-bold text-red-600">
          ₹{totalFine.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
};

export default FineSummaryPanel;
