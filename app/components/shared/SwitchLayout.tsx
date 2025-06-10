import React from "react";
import listicon from "../../assets/list.png";
import gridicon from "../../assets/grid.png";

const SwitchLayout = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between bg-white ">
        <div className="flex flex-row items-center gap-4 p-8">
          <button>
            <div className="bg-white border-2 border-[#2A529C]  w-8 h-8 items-center justify-center rounded-md  ">
              <svg
                className="w-6 h-6  text-[#2A529C] "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </div>
          </button>

          <div className="text-2xl font-semibold text-[#2A529C]">
            Mae Moh Power Plant Unit 14
          </div>

          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 5 7 7-7 7"
            />
          </svg>

          <div className="text-xl  text-gray-500">imo Designer</div>
        </div>

        <div className="flex flex-row items-center p-8">
          <button className="bg-[#2A529C] w-10 h-10 items-center justify-center rounded-l-md">
            <img src={listicon} alt="list" className="w-6 h-6" />
          </button>
          <button className="bg-[#F5F5F5]  w-10 h-10 items-center justify-center rounded-r-md">
            <img src={gridicon} alt="grid" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="w-80% h-[2px] bg-gray-200 mx-8 "/>
    </div>
  );
};

export default SwitchLayout;
