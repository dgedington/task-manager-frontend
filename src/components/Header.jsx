import React from 'react';
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

const Header = ({ title, width }) => {
  return (<React.Fragment>
      <header className='flex w-screen min-h-[80px] bg-blue-500 items-center justify-between align-middle px-16'>
          <h1 className='text-2xl'>{title}</h1>
          {width < 768 ? <FaMobileAlt className='text-4xl'/> : width < 992 ? <FaTabletAlt className='text-4xl'/> : <FaLaptop className='text-4xl'/> }
      </header>
  </React.Fragment>
  )
}

export default Header