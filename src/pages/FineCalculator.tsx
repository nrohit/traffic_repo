import React, { useState, useMemo, useCallback } from 'react';
import { Calculator, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Violation, ViolationCategory, SelectedViolation } from '../types/fine';
import { violations } from '../data/violations';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ViolationCard from '../components/ViolationCard';
import FineSummaryPanel from '../components/FineSummaryPanel';

const FineCalculator: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ViolationCategory | 'all'>('all');
  const [selected, setSelected] = useState<Map<string, SelectedViolation>>(new Map());

  const filteredViolations = useMemo(() => {
    return violations.filter((v) => {
      const matchesCategory =
        categoryFilter === 'all' || v.category === categoryFilter;
      const matchesSearch =
        !searchQuery ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.section.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, categoryFilter]);

  const handleAdd = useCallback((violation: Violation) => {
    setSelected((prev) => {
      const next = new Map(prev);
      const existing = next.get(violation.id);
      if (existing) {
        next.set(violation.id, { ...existing, count: existing.count + 1 });
      } else {
        next.set(violation.id, { violation, count: 1 });
      }
      return next;
    });
  }, []);

  const handleRemove = useCallback((violationId: string) => {
    setSelected((prev) => {
      const next = new Map(prev);
      const existing = next.get(violationId);
      if (existing && existing.count > 1) {
        next.set(violationId, { ...existing, count: existing.count - 1 });
      } else {
        next.delete(violationId);
      }
      return next;
    });
  }, []);

  const handleClear = useCallback(() => {
    setSelected(new Map());
  }, []);

  const selectedViolations = useMemo(
    () => Array.from(selected.values()),
    [selected]
  );

  const totalFine = useMemo(
    () =>
      selectedViolations.reduce(
        (sum, sv) => sum + sv.violation.fineAmount * sv.count,
        0
      ),
    [selectedViolations]
  );

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
            <Calculator className="text-blue-600" size={28} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Fine Calculator
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Calculate traffic violation fines as per the Motor Vehicles
                (Amendment) Act, 2019
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Violations list */}
          <div className="lg:col-span-2 space-y-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <CategoryFilter
              selected={categoryFilter}
              onChange={setCategoryFilter}
            />

            <div className="space-y-3" role="list" aria-label="Violations">
              {filteredViolations.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No violations found matching your search.
                </p>
              ) : (
                filteredViolations.map((violation) => (
                  <ViolationCard
                    key={violation.id}
                    violation={violation}
                    count={selected.get(violation.id)?.count ?? 0}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                  />
                ))
              )}
            </div>
          </div>

          {/* Summary panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <FineSummaryPanel
                selectedViolations={selectedViolations}
                totalFine={totalFine}
                onRemove={handleRemove}
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FineCalculator;
