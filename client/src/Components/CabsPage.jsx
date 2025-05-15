import React from 'react';
import CabCard from './CabCard';
import cabs from './CabData';

export default function CabsPage() {
  return (
    <div className="w-full mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Available Cabs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cabs.map(cab => (
          <CabCard key={cab.id} cab={cab} />
        ))}
      </div>
    </div>
  );
}
