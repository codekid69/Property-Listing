import React, { useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import { useProperty } from '../context/PropertyContext';
import { Property } from '../types/Property';
import { Search } from 'lucide-react';

export function PropertyGrid() {
  const { filteredProperties, isLoading } = useProperty();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No properties found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria or add a new property.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}