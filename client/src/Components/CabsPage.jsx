import React, { useEffect, useState } from 'react';
import CabCard from './CabCard';
import axios from 'axios';
import Navbar from './Navbar';

export default function CabsPage() {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/public/all-cabs');
        setCabs(response.data);
      } catch (err) {
        setError('Failed to load cabs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <>
    <Navbar/>
    <div className="w-full mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">All Available Cabs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cabs.map(cab => (
          <CabCard key={cab._id || cab.id} cab={cab} />
        ))}
      </div>
    </div>
    </>
  );
}

