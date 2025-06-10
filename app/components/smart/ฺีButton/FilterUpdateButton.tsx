
import React, { useState, useRef, useEffect } from "react";

interface FilterUpdateButtonProps {
  onFilterChange?: (dateRange: string) => void;
  selectedRange?: string;
}

const FilterUpdateButton = ({ onFilterChange, selectedRange = "" }: FilterUpdateButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedRange);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dateRanges = [
    { value: "", label: "แก้ไขเมื่อ" },
    { value: "today", label: "วันนี้" },
    { value: "7days", label: "7 วันล่าสุด" },
    { value: "30days", label: "30 วันล่าสุด" },
    { value: "thisYear", label: "ปีนี้ (2025)" },
    { value: "lastYear", label: "ปีที่แล้ว (2024)" },
    { value: "custom", label: "กำหนดช่วงเวลาเอง" }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCustomRange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (range: string) => {
    if (range === "custom") {
      setShowCustomRange(true);
      return;
    }
    
    setSelected(range);
    setIsOpen(false);
    setShowCustomRange(false);
    
    if (onFilterChange) {
      onFilterChange(range);
    }
  };

  const handleCustomRangeSubmit = () => {
    if (customStartDate && customEndDate) {
      const customRange = `${customStartDate}_${customEndDate}`;
      setSelected("custom");
      setIsOpen(false);
      setShowCustomRange(false);
      
      if (onFilterChange) {
        onFilterChange(customRange);
      }
    }
  };

  const getDisplayText = () => {
    const selectedItem = dateRanges.find(range => range.value === selected);
    if (selected === "custom" && customStartDate && customEndDate) {
      return `${customStartDate} - ${customEndDate}`;
    }
    return selectedItem ? selectedItem.label : "วันที่อัปเดต";
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border border-[#DFDFE0] rounded-md p-4 w-48 h-10 hover:border-[#2A529C] transition-colors"
      >
        <span className={`text-sm truncate ${selected ? 'text-gray-700' : 'text-[#888888]'}`}>
          {getDisplayText()}
        </span>
        <svg
          className={`w-4 h-4 text-[#888888] transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
          {!showCustomRange ? (
            <div className="max-h-64 overflow-y-auto">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleSelect(range.value)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm ${
                    selected === range.value ? 'bg-blue-50 text-[#2A529C]' : 'text-gray-700'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">กำหนดช่วงเวลา</h4>
                
                <div className="space-y-2">
                  <label className="block text-xs text-gray-600">วันที่เริ่มต้น</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    max={getCurrentDate()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs text-gray-600">วันที่สิ้นสุด</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    min={customStartDate}
                    max={getCurrentDate()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowCustomRange(false)}
                    className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleCustomRangeSubmit}
                    disabled={!customStartDate || !customEndDate}
                    className="flex-1 px-3 py-2 text-sm text-white bg-[#2A529C] rounded-md hover:bg-[#1e3a6f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    ตกลง
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterUpdateButton;