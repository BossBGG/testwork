import React from 'react'
import barsSort from '../../assets/bars-sort.png'
import logo from '../../assets/logo.png'
const Navbar = () => {
  return (
    <div>
      <div className='flex justify-between items-center bg-white shadow-md p-4'>
        
        <div className='flex flex-row items-center gap-4'>
        <button>
          <img src={barsSort} alt="bars-sort" className='w-10'/>
        </button>

        <img src={logo} alt="Logo" className='w-10'/>
        </div>
        
        <div className='text-6xl font-bold text-gray-800'>
            Plant Profile
        </div>
      
      </div>
    </div>
  )
}

export default Navbar
