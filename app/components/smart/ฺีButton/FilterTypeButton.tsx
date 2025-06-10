import React from "react";

const FilterTypeButton = () => {
  return (
    <div>
      <div className="border border-[#DFDFE0] rounded-md p-4 m-8 w-40 h-10 items-center justify-between">
        <div className="text-[#888888] items-center ">ประเภท</div>

        <div>
        <svg
          className="w-6 h-6 text-[#888888] "
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
            d="m19 9-7 7-7-7"
          />
        </svg>
        </div>
        
      </div>
    </div>
  );
};

export default FilterTypeButton;
