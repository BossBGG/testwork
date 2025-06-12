import React, { useState } from 'react';
import CreateFileButton from './ฺีButton/CreateFileButton';
import abouticon from "../../assets/about.png";
import SearchBar from './SearchBar';
import FilterTypeButton from './ฺีButton/FilterTypeButton';
import FilterUserButton from './ฺีButton/FilterUserBuntton';
import FilterUpdateButton from './ฺีButton/FilterUpdateButton';

interface FilterSectionProps {
  onSearchChange?: (query: string) => void;
  onTypeFilterChange?: (type: string) => void;
  onUserFilterChange?: (user: string) => void;
  onUpdateFilterChange?: (dateRange: string) => void;
  onFileCreated?: (newFile: any) => void;
}

const FilterSection = ({ 
  onSearchChange, 
  onTypeFilterChange, 
  onUserFilterChange, 
  onUpdateFilterChange,
  onFileCreated
}: FilterSectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUpdate, setSelectedUpdate] = useState('');

  const handleSearchChange = (query: string) => {
    setSearchTerm(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  const handleTypeFilterChange = (type: string) => {
    setSelectedType(type);
    if (onTypeFilterChange) {
      onTypeFilterChange(type);
    }
  };

  const handleUserFilterChange = (user: string) => {
    setSelectedUser(user);
    if (onUserFilterChange) {
      onUserFilterChange(user);
    }
  };

  const handleUpdateFilterChange = (dateRange: string) => {
    setSelectedUpdate(dateRange);
    if (onUpdateFilterChange) {
      onUpdateFilterChange(dateRange);
    }
  };

  const handleFileCreated = (newFile: any) => {
    if (onFileCreated) {
      onFileCreated(newFile);
    }
  };

  return (
    <div>
      <div className='flex flex-row justify-between items-center p-4'>
        {/* Left side - CreateFileButton + About Icon + Filter Buttons */}
        <div className='flex flex-row items-center gap-6'>
          <CreateFileButton onFileCreated={handleFileCreated} />
          
          <img src={abouticon} alt="about" className='w-6 h-6' />
          
          <FilterTypeButton 
            onFilterChange={handleTypeFilterChange}
            selectedType={selectedType}
          />
          
          <FilterUserButton 
            onFilterChange={handleUserFilterChange}
            selectedUser={selectedUser}
          />
          
          <FilterUpdateButton 
            onFilterChange={handleUpdateFilterChange}
            selectedRange={selectedUpdate}
          />
        </div>

        {/* Right side - SearchBar */}
        <div className='flex flex-row items-center justify-end'>
          <SearchBar 
            onSearch={handleSearchChange}
            className="w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;