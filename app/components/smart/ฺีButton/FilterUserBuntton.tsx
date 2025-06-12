import React, { useState, useRef, useEffect } from "react";
import searchIcon from "../../../assets/search.png";
import avatar from "../../../assets/Avatar.png";

interface FilterUserButtonProps {
  onFilterChange?: (user: string) => void;
  selectedUser?: string;
}

const FilterUserButton = ({ onFilterChange, selectedUser = "" }: FilterUserButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(selectedUser);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // รายการผู้ใช้ล่าสุด (สามารถเก็บใน localStorage หรือ state management)
  const [recentUsers, setRecentUsers] = useState<string[]>([
    "Alice Smith",
    "Bob Johnson",
    "Charlie Lee"
  ]);

  // รายการผู้ใช้ทั้งหมด (จริงๆ ควรมาจาก API)
  const allUsers = [

    "Alice Smith",
    "Bob Johnson",
    "Charlie Lee",
    "Diana Park",
    "Eve Wilson",
    "Frank Miller"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (user: string) => {
    // ถ้าคลิกผู้ใช้เดียวกันกับที่เลือกอยู่ ให้ยกเลิกการกรอง
    if (selected === user) {
      setSelected("");
      setIsOpen(false);
      setSearchTerm("");
      if (onFilterChange) {
        onFilterChange("");
      }
      return;
    }

    setSelected(user);
    setIsOpen(false);
    setSearchTerm("");
    
    // เพิ่มผู้ใช้ลงในรายการล่าสุด
    const updatedRecent = [user, ...recentUsers.filter(u => u !== user)].slice(0, 3);
    setRecentUsers(updatedRecent);
    
    if (onFilterChange) {
      onFilterChange(user);
    }
  };

  const clearFilter = () => {
    setSelected("");
    setIsOpen(false);
    setSearchTerm("");
    if (onFilterChange) {
      onFilterChange("");
    }
  };

  const filteredUsers = allUsers.filter(user =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDisplayText = () => {
    return selected || "บุคคล";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border border-[#DFDFE0] rounded-md p-4 w-40 h-10 hover:border-[#2A529C] transition-colors"
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
        <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
          {/* Search Box */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={searchIcon} alt="search" className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาผู้คน"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Options */}
          <div className="max-h-48 overflow-y-auto">
            {/* Recent users */}
            {!searchTerm && recentUsers.length > 0 && (
              <>
                <div className="px-4 py-2 text-md text-[#000000] bg-gray-50">
                  ค้นหาล่าสุด
                </div>
                {recentUsers.map((user) => (
                  <button
                    key={`recent-${user}`}
                    onClick={() => handleSelect(user)}
                    className={`flex flex-row items-center justify-between w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm ${
                      selected === user ? 'bg-blue-50 text-[#2A529C]' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <img 
                          src={avatar} 
                          alt="profile" 
                          className="w-8 h-8 object-cover" 
                        />
                      </div>
                      <div className="ml-3">
                        {user}
                      </div>
                    </div>
                    {/* เพิ่ม SVG arrow */}
                    <svg 
                      className="w-4 h-4 text-gray-400"
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
                  </button>
                ))}
                <div className="border-b border-gray-100"></div>
              </>
            )}

            {/* Filtered users when searching */}
            {searchTerm && (
              <>
                <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 font-medium">
                  ผลการค้นหา
                </div>
                {filteredUsers.map((user) => (
                  <button
                    key={user}
                    onClick={() => handleSelect(user)}
                    className={`flex flex-row items-center justify-between w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm ${
                      selected === user ? 'bg-blue-50 text-[#2A529C]' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <img 
                          src={avatar} 
                          alt="profile" 
                          className="w-8 h-8 object-cover" 
                        />
                      </div>
                      <div className="ml-3">
                        {user}
                      </div>
                    </div>
                    {/* เพิ่ม SVG arrow */}
                    <svg 
                      className="w-4 h-4 text-gray-400"
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
                  </button>
                ))}
              </>
            )}

            {searchTerm && filteredUsers.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">
                ไม่พบผู้ใช้ที่ค้นหา
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterUserButton;