import React from "react";
import barsSort from "../../assets/bars-sort.png";
import logo from "../../assets/logo.png";
import alr from "../../assets/alr.png";
import smenu from "../../assets/smenu.png";
const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center  shadow-md p-4">
        <div className="flex flex-row justify-between items-center gap-4">
        {/* menu */}
          <button>
            <img src={barsSort} alt="bars-sort" className="w-10" />
          </button>
        {/* logo */}
          <img src={logo} alt="Logo" className="w-10" />
        </div>

        <div className="text-6xl font-bold text-gray-800">Plant Profile</div>
      </div>

      <div className="flex flex-row justify-between items-center gap-4">
        {/* new message */}
        <button>
            <img src={alr} alt="alr" className="w-10" />
        </button>
        {/* img profile */}
        <img src="" alt="" />

        <div>
            <div className="text-3xl font-bold text-gray-800">
                ภูริวัฒน์ พงศ์พินิ
            </div>
            <div className="text-gray-500">
                123456
            </div>
        </div>

        <button>
            <img src={smenu} alt="smenu" className="w-10" />
        </button>


      </div>
    </div>
  );
};

export default Navbar;
