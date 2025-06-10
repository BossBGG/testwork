import React from 'react'
import CreateFileButton from './ฺีButton/CreateFileButton'
import abouticon from "../../assets/about.png";
import SearchBar from './SearchBar';
import FilterTypeButton from './ฺีButton/FilterTypeButton';

const FilterSection = () => {
  return (
    <div>
      <div className='flex flex-row justify-between items-center p-4 '>
        {/* CreateFileButton + FilterButton */}
        <div className='flex flex-row items-center '>

          <CreateFileButton/>

          <img src={abouticon} alt="about" className='ml-3'/>

          <FilterTypeButton/>

        </div>
        {/* SearchBar */}
        <div className='flex flex-row items-center justify-end w-full'>
          <SearchBar/>
        </div>
      </div>

      
    </div>
  )
}

export default FilterSection
