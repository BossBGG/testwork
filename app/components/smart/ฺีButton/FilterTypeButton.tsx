import React, { useState, useRef, useEffect } from "react";

interface FilterTypeButtonProps {
  onFilterChange?: (type: string) => void;
  selectedType?: string;
}

const FilterTypeButton = ({ onFilterChange, selectedType = "" }: FilterTypeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedType);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fileTypes = [
    { value: "", label: "ทั้งหมด" },
    { value: "โฟลเดอร์", label: "โฟลเดอร์" },
    { value: "Customize View", label: "Customize View" },
    { value: "BI", label: "BI" },
    { value: "KPI", label: "KPI" }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (type: string) => {
    setSelected(type);
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(type);
    }
  };

  const getDisplayText = () => {
    const selectedItem = fileTypes.find(type => type.value === selected);
    return selectedItem ? selectedItem.label : "ประเภท";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border border-[#DFDFE0] rounded-md p-4 w-40 h-10 hover:border-[#2A529C] transition-colors"
      >
        <span className={`text-sm ${selected ? 'text-gray-700' : 'text-[#888888]'}`}>
          ประเภท : {getDisplayText()}
        </span>
        <svg
          className={`w-4 h-4 text-[#888888] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
          {fileTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleSelect(type.value)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm ${
                selected === type.value ? 'bg-blue-50 text-[#2A529C]' : 'text-gray-700'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterTypeButton;