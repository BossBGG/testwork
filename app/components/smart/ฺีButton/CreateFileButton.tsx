import React, { useState, useRef, useEffect } from "react";
import foldericon from "../../../assets/folder.png";
import KPIicon from "../../../assets/KPI.png";
import BIicon from "../../../assets/BI.png";
import CVicon from "../../../assets/CV.png";

interface CreateFileButtonProps {
  onFileCreated?: (newFile: any) => void;
}

const CreateFileButton = ({ onFileCreated }: CreateFileButtonProps) => {
  const [showTypeFileDropdown, setShowTypeFileDropdown] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [fileName, setFileName] = useState("");
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
    { icon: foldericon, name: "โฟลเดอร์ใหม่", type: "โฟลเดอร์" },
    { icon: CVicon, name: "Customize View", type: "Customize View" },
    { icon: BIicon, name: "BI", type: "BI" },
    { icon: KPIicon, name: "KPI", type: "KPI" }
  ];

  const handleFileTypeSelect = (type: string) => {
    setSelectedType(type);
    setShowTypeFileDropdown(false);
    setShowNameModal(true);
    
    // ตั้งชื่อเริ่มต้น
    const defaultNames: { [key: string]: string } = {
      "โฟลเดอร์": "โฟลเดอร์ใหม่",
      "Customize View": "Customize View ใหม่",
      "BI": "BI Report ใหม่",
      "KPI": "KPI Dashboard ใหม่"
    };
    setFileName(defaultNames[type] || "ไฟล์ใหม่");
  };

  const handleCreateFile = () => {
    if (!fileName.trim()) return;

    const currentDate = new Date().toISOString();
    const newFile = {
      fileName: fileName.trim(),
      fileType: selectedType,
      createdBy: "ภูริวัฒน์ พงศ์พินิ", 
      sizeMB: selectedType === "โฟลเดอร์" ? 0 : Math.round((Math.random() * 50 + 1) * 100) / 100,
      storageUsedMB: selectedType === "โฟลเดอร์" ? 0 : Math.round((Math.random() * 50 + 1) * 100) / 100,
      createdAt: currentDate,
      publishedAt: selectedType === "โฟลเดอร์" ? null : currentDate,
      updatedAt: currentDate,
      lastOpenedAt: currentDate
    };

    // เรียก callback เพื่อเพิ่มไฟล์ใหม่
    if (onFileCreated) {
      onFileCreated(newFile);
    }

    // รีเซ็ตฟอร์ม
    setShowNameModal(false);
    setSelectedType("");
    setFileName("");
    
    console.log("Created new file:", newFile);
  };

  const handleCancel = () => {
    setShowNameModal(false);
    setSelectedType("");
    setFileName("");
  };

  return (
    <>
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
              {fileTypes.map((fileType, index) => (
                <li key={fileType.type}>
                  <button
                    onClick={() => handleFileTypeSelect(fileType.type)}
                    className="w-full flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors text-left"
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
                  {/* เส้นกั่นหลัง "โฟลเดอร์ใหม่" */}
                  {index === 0 && (
                    <div className="w-[full] h-[1px] bg-gray-200 " />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal สำหรับใส่ชื่อไฟล์ */}
      {/* {showNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg p-6  w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              สร้าง{selectedType}ใหม่
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อ{selectedType}
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`ใส่ชื่อ${selectedType}`}
                autoFocus
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCreateFile}
                disabled={!fileName.trim()}
                className="px-4 py-2 text-sm text-white bg-[#2A529C] rounded-md hover:bg-[#1e3a6f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                สร้าง
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CreateFileButton;