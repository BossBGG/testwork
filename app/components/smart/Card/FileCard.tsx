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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hasImage, setHasImage] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

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

  // คำนวณตำแหน่ง dropdown (ใช้ตำแหน่งสัมพัทธ์กับ card)
  const calculateMenuPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const cardElement = buttonRef.current.closest('.file-card-container');
      
      if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect();
        const menuWidth = 192; // ประมาณความกว้างของ menu (w-48 = 192px)
        
        // คำนวณตำแหน่งสัมพัทธ์กับ card
        const relativeTop = buttonRect.bottom - cardRect.top + 4;
        const relativeLeft = buttonRect.right - cardRect.left - menuWidth;
        
        setMenuPosition({ 
          top: relativeTop, 
          left: relativeLeft 
        });
      }
    }
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

  const handleMenuButtonClick = () => {
    if (!showMenu) {
      calculateMenuPosition();
    }
    setShowMenu(!showMenu);
  };

  const menuItems = [
    { icon: "✏️", label: "แก้ไข", action: "edit" },
    { icon: "🔗", label: "แชร์", action: "share" },
    { icon: "📝", label: "เปลี่ยนชื่อ", action: "rename" },
    { icon: "📄", label: "ทำสำเนา", action: "copy" },
    { icon: "🗑️", label: "ลบ", action: "delete" },
  ];

  return (
    <>
      <div className="file-card-container w-[282px] h-[302px] bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow relative group">
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
        <div className="flex justify-between items-center mb-2">
          {/* File Name */}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight flex-1 mr-2 ">
            {fileName}
          </h3>

          {/* Menu Button - อยู่แนวนอนตรงกลาง */}
          <div className="relative flex-shrink-0 flex items-center">
            <button
              ref={buttonRef}
              onClick={handleMenuButtonClick}
              className="transition-opacity p-1 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Update Date  */}
        <div className="mt-auto pb-1">
          <p className="text-xs text-gray-500">
            วันที่อัปเดต: {formatDate(updatedAt)}
          </p>
        </div>

        {/* Dropdown Menu  */}
        {showMenu && (
          <div 
            ref={menuRef}
            className="absolute bg-white border border-gray-200 rounded-md shadow-lg z-50 w-48"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
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
    </>
  );
};

export default FileCard;