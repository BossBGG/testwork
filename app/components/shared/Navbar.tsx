import React from "react";
// Import รูปภาพแบบ ES6 modules แทนการใช้ string path
import barsSort from "../../assets/bars-sort.png";
import logo from "../../assets/logo.png";
import alr from "../../assets/alr.png";
import smenu from "../../assets/smenu.png";
import avatar from "../../assets/Avatar.png";

const Navbar = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row bg-white  justify-between">
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

          <div className="text-xl font-semibold  text-[#2A529C] pl-8">
            Plant Profile
          </div>

          <div className="w-10"> {/* Placeholder for balance */}</div>
        </div>

        {/* User profile section */}
        <div className="flex flex-row justify-between items-center gap-4 p-4 bg-gray-50">
          {/* new message button */}
          <button className="hover:opacity-80 transition-opacity">
            <img src={alr} alt="notification" className="w-9 h-9" />
          </button>

          {/* user info */}
          <div className="flex items-center gap-3">
            {/* profile image placeholder */}
            <div className="w-12 h-12  rounded-full flex items-center justify-center">
              <img src={avatar} alt="notification" className="w-10 h-10" />
            </div>

            <div className="text-center">
              <div className="text-2xl  text-[#2A529C]">ภูริวัฒน์ พงศ์พินิ</div>

              <div className="text-gray-500 text-sm text-end">123456</div>
            </div>
          </div>

          {/* settings menu button */}
          <button className="hover:opacity-80 transition-opacity">
            <img src={smenu} alt="settings menu" className="w-7 h-7" />
          </button>
        </div>

        
      </div>
      <div className="w-full h-[8px] bg-[#FFCC2A]"  />
    </div>
  );
};

export default Navbar;
