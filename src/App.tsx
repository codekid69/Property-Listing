import React, { useState } from 'react';
import { PropertyProvider } from './context/PropertyContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { PropertyGrid } from './components/PropertyGrid';
import { FloatingActionButton } from './components/FloatingActionButton';
import { AddPropertyModal } from './components/AddPropertyModal';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <PropertyProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <SearchFilters />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PropertyGrid />
          </main>

          <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
          
          {isAddModalOpen && (
            <AddPropertyModal onClose={() => setIsAddModalOpen(false)} />
          )}
        </div>
      </PropertyProvider>
    </ThemeProvider>
  );
}

export default App;