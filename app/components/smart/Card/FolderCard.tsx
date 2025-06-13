import React, { useState, useRef, useEffect } from "react";
import folderfieldicon from "../../../assets/folder2.png";
import trashicon from "../../../assets/trash.png"; 
import userplus from "../../../assets/user-plus.png"; 
import pennib from "../../../assets/pen-nib.png"; 
import copy from "../../../assets/copy.png"; 
import share from "../../../assets/share.png"; 
import view from "../../../assets/view.png"; 

interface FolderCardProps {
  folderName: string;
  updatedAt: string;
  onMenuAction?: (action: string, folderName: string) => void;
  onClick?: () => void;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const FolderCard = ({
  folderName,
  updatedAt,
  onMenuAction,
  onClick,
  onContextMenu,
}: FolderCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // ฟังก์ชันแปลงวันที่
  

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
    event.stopPropagation(); 
    if (onMenuAction) {
      onMenuAction(action, folderName);
    }
    setShowMenu(false);
  };

  const handleMenuButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  const menuItems = [
    { icon: view, label: "เปิด", action: "open", isImage: true  },
    { icon: userplus, label: "แก้ไข", action: "edit", isImage: true  },
    { icon: share, label: "แชร์", action: "share", isImage: true  },
    { icon: pennib, label: "เปลี่ยนชื่อ", action: "rename", isImage: true  },
    { icon: copy, label: "ทำสำเนา", action: "copy", isImage: true  },
    { icon: trashicon, label: "ลบ", action: "delete", isImage: true }, 
  ];

  return (
    <div
      className="w-[282px] h-[82px] bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer relative group flex flex-col justify-between"
      onClick={onClick}
      onContextMenu={onContextMenu}
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
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1 leading-tight truncate mt-1">
              {folderName}
            </h3>
          </div>
        </div>

        {/* Right side - Menu Button */}
        <div className="absolute flex-shrink-0 items-center justify-content-center ml-58 mt-4" ref={menuRef}>
          <button
            onClick={handleMenuButtonClick}
            className="transition-opacity p-1 rounded-full hover:bg-gray-100"
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
            <div 
            ref={menuRef}
            className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-60"
            
            >
            
              {menuItems.map((item) => (
                <button
                  key={item.action}
                  onClick={(e) => handleMenuAction(item.action, e)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors `}
                >
                  {item.isImage ? (
                    <img src={item.icon} alt="" className="w-4 h-4" />
                  ) : (
                    <span className="text-base">{item.icon}</span>
                  )}
                  
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section - Update Date */}
      <div className="mt-2">
        <p className="text-sm text-gray-500 truncate">
          วันที่อัปเดต: {updatedAt}
        </p>
      </div>
    </div>
  );
};

export default FolderCard;
