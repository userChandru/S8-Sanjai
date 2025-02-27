import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const BusinessCard = ({ business }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <img 
        src={business.business_image} 
        alt={business.business_name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{business.business_name}</h3>
        <p className="text-gray-600">{business.business_sector}</p>
      </div>
    </div>
  );
};

const BusinessPage = () => {
  const { user } = useContext(AuthContext);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    console.log('BusinessPage mounted, user:', user); // Debug log
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('/api/users/profile/businesses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        console.log('Fetched businesses:', data); // Debug log
        setBusinesses(data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Businesses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map(business => (
          <BusinessCard key={business._id} business={business} />
        ))}
      </div>
    </div>
  );
};

export default BusinessPage; 