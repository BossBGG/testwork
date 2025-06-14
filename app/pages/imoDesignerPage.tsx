import React, { useState, useEffect } from 'react';
import Navbar from '~/components/shared/Navbar';
import SwitchLayout from '~/components/shared/SwitchLayout';
import FilterSection from '~/components/smart/FilterSection';
import GridLayout from '~/components/smart/GridLayout';
import ImoDesignerDetail from '~/components/smart/imoDesignerDetail';
import mockFilesData from '~/mockData/mockFiles.json';

const ImoDesignerPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterUpdate, setFilterUpdate] = useState('');
  const [files, setFiles] = useState(mockFilesData);

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

  const handleFileCreated = (newFile: any) => {
    setFiles(prevFiles => [newFile, ...prevFiles]);
    console.log('New file created:', newFile);
  };

  return (
    <div className="min-h-screen bg-white">
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
        onFileCreated={handleFileCreated}
      />
      
      <div className="px-8 pb-8">
        {viewMode === 'list' ? (
          <ImoDesignerDetail 
            searchTerm={searchTerm}
            filterType={filterType}
            filterUser={filterUser}
            filterUpdate={filterUpdate}
            files={files}
          />
        ) : (
          <GridLayout
            searchTerm={searchTerm}
            filterType={filterType}
            filterUser={filterUser}
            filterUpdate={filterUpdate}
            files={files}
          />
        )}
      </div>
    </div>
  );
};

export default ImoDesignerPage;