import React, { useState, useRef, useEffect } from "react";
import folderfieldicon from "../../../assets/folder2.png";

interface FolderCardProps {
  folderName: string;
  updatedAt: string;
  onMenuAction?: (action: string, folderName: string) => void;
  onClick?: () => void;
}

const FolderCard = ({
  folderName,
  updatedAt,
  onMenuAction,
  onClick,
}: FolderCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleMenuAction = (action: string, event: React.MouseEvent) => {
    event.stopPropagation(); // ป้องกันไม่ให้เรียก onClick ของ card
    if (onMenuAction) {
      onMenuAction(action, folderName);
    }
    setShowMenu(false);
  };

  const handleMenuButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // ป้องกันไม่ให้เรียก onClick ของ card
    setShowMenu(!showMenu);
  };

  const menuItems = [
    { icon: "✏️", label: "เปิด", action: "open" },
    { icon: "📝", label: "เปลี่ยนชื่อ", action: "rename" },
    { icon: "📄", label: "ทำสำเนา", action: "copy" },
    { icon: "🗑️", label: "ลบ", action: "delete" },
  ];

  return (
    <div
      className="w-[282px] h-[82px] bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer relative group overflow-hidden flex flex-col justify-between"
      onClick={onClick}
    >
      {/* Top Section - Content Container */}
      <div className="flex items-start justify-between">
        {/* Left side - Icon and Text */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Folder Icon */}
          <div className="flex-shrink-0 mt-1">
            <img
              src={folderfieldicon}
              alt="folder"
              className="w-5 h-5 object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            {/* Folder Name */}
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1 leading-tight truncate">
              {folderName}
            </h3>
          </div>
        </div>

        {/* Right side - Menu Button */}
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            onClick={handleMenuButtonClick}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              {menuItems.map((item) => (
                <button
                  key={item.action}
                  onClick={(e) => handleMenuAction(item.action, e)}
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

      {/* Bottom Section - Update Date */}
      <div className="mt-2">
        <p className="text-xs text-gray-500 truncate">
          วันที่อัปเดต: {formatDate(updatedAt)}
        </p>
      </div>
    </div>
  );
};

export default FolderCard;
