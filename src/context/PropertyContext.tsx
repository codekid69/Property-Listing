import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Property, PropertyType, PropertyFilters } from '../types/Property';

interface PropertyState {
  properties: Property[];
  filters: PropertyFilters;
  isLoading: boolean;
  error: string | null;
}

type PropertyAction =
  | { type: 'ADD_PROPERTY'; payload: Omit<Property, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_PROPERTY'; payload: Property }
  | { type: 'DELETE_PROPERTY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<PropertyFilters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_PROPERTIES'; payload: Property[] };

interface PropertyContextType extends PropertyState {
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  clearFilters: () => void;
  filteredProperties: Property[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const initialState: PropertyState = {
  properties: [],
  filters: {
    search: '',
    type: 'All'
  },
  isLoading: false,
  error: null
};

// Sample data
const sampleProperties: Property[] = [
  {
    id: '1',
    name: 'Modern Downtown Apartment',
    type: 'Apartment',
    price: 350000,
    location: 'New York, NY',
    description: 'Beautiful modern apartment in the heart of downtown with stunning city views and premium amenities.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Suburban Family House',
    type: 'House',
    price: 750000,
    location: 'Los Angeles, CA',
    description: 'Spacious 4-bedroom family home with large backyard, perfect for families with children.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Luxury Waterfront Condo',
    type: 'Condo',
    price: 1200000,
    location: 'Miami, FL',
    description: 'Exclusive waterfront condominium with panoramic ocean views and world-class amenities.',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  }
];

function propertyReducer(state: PropertyState, action: PropertyAction): PropertyState {
  switch (action.type) {
    case 'ADD_PROPERTY':
      const newProperty: Property = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return {
        ...state,
        properties: [...state.properties, newProperty]
      };
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        properties: state.properties.map(prop =>
          prop.id === action.payload.id
            ? { ...action.payload, updatedAt: new Date() }
            : prop
        )
      };
    case 'DELETE_PROPERTY':
      return {
        ...state,
        properties: state.properties.filter(prop => prop.id !== action.payload)
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOAD_PROPERTIES':
      return { ...state, properties: action.payload, isLoading: false };
    default:
      return state;
  }
}

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  // Load properties from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('properties');
      if (saved) {
        const properties = JSON.parse(saved).map((prop: any) => ({
          ...prop,
          createdAt: new Date(prop.createdAt),
          updatedAt: new Date(prop.updatedAt)
        }));
        dispatch({ type: 'LOAD_PROPERTIES', payload: properties });
      } else {
        // Load sample data if no saved data
        dispatch({ type: 'LOAD_PROPERTIES', payload: sampleProperties });
      }
    } catch (error) {
      console.error('Failed to load properties:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load properties' });
      dispatch({ type: 'LOAD_PROPERTIES', payload: sampleProperties });
    }
  }, []);

  // Save properties to localStorage whenever they change
  useEffect(() => {
    if (state.properties.length > 0) {
      localStorage.setItem('properties', JSON.stringify(state.properties));
    }
  }, [state.properties]);

  const addProperty = (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_PROPERTY', payload: property });
  };

  const updateProperty = (property: Property) => {
    dispatch({ type: 'UPDATE_PROPERTY', payload: property });
  };

  const deleteProperty = (id: string) => {
    dispatch({ type: 'DELETE_PROPERTY', payload: id });
  };

  const setFilters = (filters: Partial<PropertyFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: { search: '', type: 'All' } });
  };

  // Filter properties based on current filters
  const filteredProperties = state.properties.filter(property => {
    const matchesSearch = state.filters.search === '' ||
      property.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
      property.location.toLowerCase().includes(state.filters.search.toLowerCase());

    const matchesType = state.filters.type === 'All' || property.type === state.filters.type;

    return matchesSearch && matchesType;
  });

  const value: PropertyContextType = {
    ...state,
    addProperty,
    updateProperty,
    deleteProperty,
    setFilters,
    clearFilters,
    filteredProperties
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}