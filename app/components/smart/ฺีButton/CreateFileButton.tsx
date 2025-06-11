import React, { useState, useRef, useEffect } from "react";
import foldericon from "../../../assets/folder.png";
import KPIicon from "../../../assets/KPI.png";
import BIicon from "../../../assets/BI.png";
import CVicon from "../../../assets/CV.png";

const CreateFileButton = () => {
  const [showTypeFileDropdown, setShowTypeFileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowTypeFileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fileTypes = [
    { icon: foldericon, name: "โฟลเดอร์ใหม่", type: "folder" },
    { icon: CVicon, name: "Customize View", type: "customize" },
    { icon: BIicon, name: "BI", type: "bi" },
    { icon: KPIicon, name: "KPI", type: "kpi" }
  ];

  const handleFileTypeSelect = (type: string) => {
    console.log("Selected file type:", type);
    setShowTypeFileDropdown(false);
    
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex flex-row justify-center w-26 h-12 bg-[#2A529C] rounded-xl items-center shadow-lg m-4 hover:bg-[#1e3a6f] transition-colors"
        onClick={() => setShowTypeFileDropdown(!showTypeFileDropdown)}
      >
        <svg
          className="w-8 h-8 text-white"
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
            d="M5 12h14m-7 7V5"
          />
        </svg>
        <div className="text-white text-lg font-semibold m-2">NEW</div>
      </button>

      {showTypeFileDropdown && (
        <div className="absolute top-full left-4 bg-white shadow-xl rounded-lg border border-gray-200 p-2 mt-1 z-20 min-w-[200px]">
          <ul className="space-y-1">
            {fileTypes.map((fileType) => (
              <li key={fileType.type}>
                <button
                  onClick={() => handleFileTypeSelect(fileType.type)}
                  className="w-full flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-md transition-colors text-left"
                >
                  <img 
                    src={fileType.icon} 
                    alt={fileType.type} 
                    className="w-5 h-5" 
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    {fileType.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateFileButton;