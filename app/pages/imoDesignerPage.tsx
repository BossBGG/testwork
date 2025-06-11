
import React, { useState } from 'react';
import Navbar from '~/components/shared/Navbar';
import SwitchLayout from '~/components/shared/SwitchLayout';
import FilterSection from '~/components/smart/FilterSection';
import GridDetail from '~/components/smart/GridDetail';
import ImoDesignerDetail from '~/components/smart/imoDesignerDetail';

const ImoDesignerPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterUpdate, setFilterUpdate] = useState('');

  const handleViewModeChange = (mode: 'list' | 'grid') => {
    setViewMode(mode);
  };

  const handleSearchChange = (query: string) => {
    setSearchTerm(query);
  };

  const handleTypeFilterChange = (type: string) => {
    setFilterType(type);
  };

  const handleUserFilterChange = (user: string) => {
    setFilterUser(user);
  };

  const handleUpdateFilterChange = (dateRange: string) => {
    setFilterUpdate(dateRange);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <SwitchLayout 
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />
      
      <FilterSection 
        onSearchChange={handleSearchChange}
        onTypeFilterChange={handleTypeFilterChange}
        onUserFilterChange={handleUserFilterChange}
        onUpdateFilterChange={handleUpdateFilterChange}
      />
      
      <div className="px-8 pb-8">
        {viewMode === 'list' ? (
          <ImoDesignerDetail 
            searchTerm={searchTerm}
            filterType={filterType}
            filterUser={filterUser}
            filterUpdate={filterUpdate}
          />
        ) :  (
          <GridDetail/>
          
        )}
      </div>
    </div>
  );
};

export default ImoDesignerPage;