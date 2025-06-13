import React, { useState } from "react";
import listicon from "../../assets/list.png";
import gridicon from "../../assets/grid.png";

interface SwitchLayoutProps {
  viewMode?: 'list' | 'grid';
  onViewModeChange?: (mode: 'list' | 'grid') => void;
}

const SwitchLayout = ({ viewMode = 'list', onViewModeChange }: SwitchLayoutProps) => {
  const [currentView, setCurrentView] = useState<'list' | 'grid'>(viewMode);

  const handleViewChange = (mode: 'list' | 'grid') => {
    setCurrentView(mode);
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between bg-white">
        <div className="flex flex-row items-center gap-4 p-8">
          <button className="hover:bg-blue-100 transition-colors rounded-md">
            <div className="bg-white border-2 border-[#2A529C] w-8 h-8 flex items-center justify-center rounded-md">
              <svg
                className="w-6 h-6 text-[#2A529C]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </div>
          </button>

          <div className="text-2xl font-semibold text-[#2A529C]">
            Mae Moh Power Plant Unit 14
          </div>

          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>

          <div className="text-xl text-gray-500">imo Designer</div>
        </div>

        <div className="flex flex-row items-center p-8">
          <button 
            onClick={() => handleViewChange('list')}
            className={`w-10 h-10 flex items-center justify-center rounded-l-md transition-all ${
              currentView === 'list' 
                ? 'bg-[#2A529C]' 
                : 'bg-[#F5F5F5] hover:bg-[#2A529C] hover:bg-opacity-20'
            }`}
          >
            <img 
              src={listicon} 
              alt="list" 
              className={`w-3 h-3 transition-all ${
                currentView === 'list' 
                  ? 'filter brightness-0 invert' 
                  : 'filter grayscale brightness-75'
              }`} 
            />
          </button>
          <button 
            onClick={() => handleViewChange('grid')}
            className={`w-10 h-10 flex items-center justify-center rounded-r-md transition-all ${
              
              currentView === 'grid' 
                ? 'bg-[#2A529C]' 
                : 'bg-[#F5F5F5] hover:bg-[#2A529C] hover:bg-opacity-20'
            }`}
          >
            <img 
              src={gridicon} 
              alt="grid" 
              className={`w-3 h-3 transition-all ${
                currentView === 'grid' 
                  ? 'filter brightness-0 invert' 
                  : 'filter grayscale brightness-75 '
              }`} 
            />
          </button>
        </div>
      </div>

      <div className="w-full h-[2px] bg-gray-200 mx-8" />
    </div>
  );
};

export default SwitchLayout;