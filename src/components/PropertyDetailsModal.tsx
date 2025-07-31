import React, { useState } from 'react';
import { X, MapPin, DollarSign, Calendar, Edit3, Trash2 } from 'lucide-react';
import { Property } from '../types/Property';
import { useProperty } from '../context/PropertyContext';
import { EditPropertyModal } from './EditPropertyModal';

interface PropertyDetailsModalProps {
  property: Property;
  onClose: () => void;
}

export function PropertyDetailsModal({ property, onClose }: PropertyDetailsModalProps) {
  const { deleteProperty } = useProperty();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDelete = () => {
    deleteProperty(property.id);
    onClose();
  };

  const handleEditComplete = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Property Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Property Image */}
            <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Property Image (300x200)
              </span>
            </div>

            {/* Property Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {property.name}
                </h3>
                <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {property.type}
                </div>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>

              <div className="flex items-center text-green-600 dark:text-green-400">
                <DollarSign className="h-6 w-6 mr-1" />
                <span className="text-3xl font-bold">{formatPrice(property.price)}</span>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Added on {property.createdAt.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Google Maps (placeholder) */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Location</h4>
              <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Google Maps integration would appear here
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Location: {property.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </button>
              
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleDelete}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditPropertyModal
          property={property}
          onClose={() => setIsEditModalOpen(false)}
          onComplete={handleEditComplete}
        />
      )}
    </>
  );
}