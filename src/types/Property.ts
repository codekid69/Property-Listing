export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  price: number;
  location: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyType = 'Apartment' | 'House' | 'Condo' | 'Townhouse' | 'Commercial';

export const PROPERTY_TYPES: PropertyType[] = [
  'Apartment',
  'House', 
  'Condo',
  'Townhouse',
  'Commercial'
];

export interface PropertyFilters {
  search: string;
  type: PropertyType | 'All';
}