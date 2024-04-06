import React, { FC, ReactNode } from 'react';
import Sidebar from './layout/Sidebar';
import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className='h-screen bg-black'>
      <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
        <div className='grid grid-cols-4 h-full'>
          <Sidebar />
          <div
            className='
              col-span-3
              lg:col-span-2
              border-x-[1px]
              border-neutral-800
            '
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
