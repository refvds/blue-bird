import React, { FC } from 'react';
import { IconType } from 'react-icons';

interface ISidebarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarItem: FC<ISidebarItemProps> = ({ href, label, icon: Icon, onClick }) => {
  return (
    <ul className='flex items-center'>
      <li
        className='
        relative 
        rounded-full 
        h-14 
        w-14 
        flex 
        items-center 
        justify-center 
        p-4 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden'
      >
        <Icon size={28} color='white' />
      </li>
      <li
        className='
        relative
        hidden
        lg:flex
        items-center
        gap-4
        p-4
        rounded-full
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
        
      '
      >
        <Icon size={24} color='white' />
        <p className='hidden lg:block text-white text-xl'>{label}</p>
      </li>
    </ul>
  );
};

export default SidebarItem;
