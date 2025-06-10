import React, { useState } from "react";
import foldericon from "../../../assets/folder.png";
import KPIicon from "../../../assets/KPI.png";
import BIicon from "../../../assets/BI.png";
import CVicon from "../../../assets/CV.png";

const CreateFileButton = () => {
  const [showTypeFileDropdown, setShowTypeFileDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex flex-row justify-center w-26 h-12 bg-[#2A529C] rounded-xl items-center shadow-lg m-4"
        onClick={() => setShowTypeFileDropdown(!showTypeFileDropdown)}
      >
        <svg
          className="w-8 h-8 text-white "
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
        <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 z-10">
          <ul className="space-y-2">
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded">
              
            <img src="../../../assets/folder.png" alt="folder" />  
              โฟลเดอร์ใหม่
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded">
              Customize View 
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded">
              BI
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded">
              KPI
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateFileButton;