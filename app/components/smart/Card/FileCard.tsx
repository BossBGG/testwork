import React, { useState, useRef, useEffect } from "react";
import foldericon from "../../../assets/folder.png";
import KPIicon from "../../../assets/KPI.png";
import BIicon from "../../../assets/BI.png";
import CVicon from "../../../assets/CV.png";
import folderfieldicon from "../../../assets/folder2.png";

interface FileCardProps {
  fileName: string;
  fileType: string;
  fileImage?: string; 
  updatedAt: string;
  onMenuAction?: (action: string, fileName: string) => void;
}

const FileCard = ({
  fileName,
  fileType,
  fileImage,
  updatedAt,
  onMenuAction,
}: FileCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [hasImage, setHasImage] = useState(false);

  // ฟังก์ชันเลือกไอคอนตามประเภทไฟล์
  const getFileIcon = (type: string) => {
    switch (type) {
      case "โฟลเดอร์":
        return folderfieldicon;
      case "KPI":
        return KPIicon;
      case "BI":
        return BIicon;
      case "Customize View":
        return CVicon;
      default:
        return foldericon;
    }
  };

  function DefaultImage() {
    return (
      <img
        src={getFileIcon(fileType)}
        alt={fileType}
        className="w-[69px] h-[55px] object-contain"
      />
    );
  }

  // ฟังก์ชันแปลงวันที่
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // ปิด menu เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuAction = (action: string) => {
    if (onMenuAction) {
      onMenuAction(action, fileName);
    }
    setShowMenu(false);
  };

  const menuItems = [
    { icon: "✏️", label: "แก้ไข", action: "edit" },
    { icon: "🔗", label: "แชร์", action: "share" },
    { icon: "📝", label: "เปลี่ยนชื่อ", action: "rename" },
    { icon: "📄", label: "ทำสำเนา", action: "copy" },
    { icon: "🗑️", label: "ลบ", action: "delete" },
  ];

  return (
    <div className="w-[282px] h-[302px] bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow relative group">
      {/* Header with menu button */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {/* File Icon Container */}
          <div className="w-[259px] h-[208px] mb-3 mr-3 bg-[#F8F9FC] flex items-center justify-center mx-auto">
            {hasImage ? (
              <img
                src={fileImage}
                alt={fileType}
                className="w-[69px] h-[55px] object-contain"
              />
            ) : (
              <div>
                <DefaultImage />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Name with Menu Button */}
      <div className="flex justify-between items-start mb-2">
        {/* File Name */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight flex-1 mr-2">
          {fileName}
        </h3>

        {/* Menu Button - ย้ายออกมาจาก h3 */}
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="transition-opacity p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div 
              className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
              style={{ 
                position: 'fixed',
                zIndex: 9999,
                transform: 'translateX(-100%)',
                marginTop: '4px'
              }}
            >
              {menuItems.map((item) => (
                <button
                  key={item.action}
                  onClick={() => handleMenuAction(item.action)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    item.action === "delete"
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Update Date */}
      <p className="text-xs text-gray-500">
        วันที่อัปเดต: {formatDate(updatedAt)}
      </p>
    </div>
  );
};

export default FileCard;