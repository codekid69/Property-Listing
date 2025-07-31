import React from 'react';
import { MapPin, DollarSign, Eye } from 'lucide-react';
import { Property } from '../types/Property';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

const typeColors = {
  Apartment: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  House: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Condo: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Townhouse: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Commercial: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
};

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] group">
      {/* Property Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t-xl flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Property Image
        </div>
      </div>

      {/* Property Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {property.name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[property.type]} transition-colors duration-200`}>
            {property.type}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm truncate">{property.location}</span>
        </div>

        {/* Price */}
        <div className="flex items-center text-green-600 dark:text-green-400 mb-3">
          <DollarSign className="h-5 w-5 mr-1" />
          <span className="text-xl font-bold">{formatPrice(property.price)}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {truncateDescription(property.description)}
        </p>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(property)}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
}