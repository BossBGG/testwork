import React, { useEffect, useRef, useState } from "react";
// Import รูปภาพแบบ ES6 modules แทนการใช้ string path
import barsSort from "../../assets/bars-sort.png";
import logo from "../../assets/logo.png";
import alr from "../../assets/alr.png";
import smenu from "../../assets/smenu.png";
import avatar from "../../assets/Avatar.png";
import userplus from "../../assets/user-plus.png";
import share from "../../assets/share.png"; 

interface NavbarProps {
  onMenuAction?: () => void;
  onViewDetail?: () => void;
}

const Navbar = ({
  onMenuAction,
  onViewDetail,
}: NavbarProps) => {
  const [showMenu, setShowMenu] = useState(false); 
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    if (action === "menu" && onViewDetail) {
      onViewDetail();
    } else if (onMenuAction) {
      onMenuAction();
    }
    setShowMenu(false); // ปิด menu หลังจากคลิก
  };

  const handleMenuButtonClick = () => {
    setShowMenu(!showMenu); // Toggle menu
  };

  const menuItems = [
    { icon: userplus, label: "แก้ไข", action: "edit", isImage: true },
    { icon: share, label: "แชร์", action: "share", isImage: true },
    { icon: "", label: "เขื่อน", action: "dam" },
    { icon: "", label: "โรงไฟฟ้าพลังน้ำท้ายเขื่อน", action: "powerplant" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-row bg-white justify-between">
        {/* Header section */}
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-row justify-between items-center gap-8">
            {/* menu button */}
            <button className="hover:opacity-80 transition-opacity">
              <img src={barsSort} alt="bars-sort" className="w-5 h-5" />
            </button>
            {/* logo */}
            <img src={logo} alt="Logo" className="w-34 h-12" />
          </div>

          <div className="text-xl font-semibold text-[#2A529C] pl-8">
            Plant Profile
          </div>

          <div className="w-10"> {/* Placeholder for balance */}</div>
        </div>

        {/* User profile section */}
        <div className="flex flex-row justify-between items-center gap-4 p-4 bg-white relative">
          {/* new message button */}
          <button className="hover:opacity-80 transition-opacity">
            <img src={alr} alt="notification" className="w-9 h-9" />
          </button>

          {/* user info */}
          <div className="flex items-center gap-3">
            {/* profile image placeholder */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <img src={avatar} alt="notification" className="w-10 h-10" />
            </div>

            <div className="text-center">
              <div className="text-2xl text-[#2A529C]">ภูริวัฒน์ พงศ์พินิ</div>
              <div className="text-gray-500 text-sm text-end">123456</div>
            </div>
          </div>

          {/* settings menu button */}
          <div className="relative" ref={menuRef}>
            <button
              ref={buttonRef}
              onClick={handleMenuButtonClick}
              className="hover:opacity-80 transition-opacity"
            >
              <img src={smenu} alt="settings menu" className="w-7 h-7" />
            </button>

            {/* Dropdown Menu */}
            {/* {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-48 p-2">
                {menuItems.map((item) => (
                  <button
                    key={item.action}
                    onClick={() => handleMenuAction(item.action)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-[#DDE7F9] transition-colors text-left rounded-md "
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
            )} */}
          </div>
        </div>
      </div>
      <div className="w-full h-[8px] bg-[#FFCC2A]" />
    </div>
  );
};

export default Navbar;