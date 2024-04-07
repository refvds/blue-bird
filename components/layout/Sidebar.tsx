import React from 'react';
import SidebarLogo from './SidebarLogo';
import { ISidebarItem } from '@/types';
import { sidebarItems } from '@/constants';
import SidebarItem from './SidebarItem';
import { BiLogOut } from 'react-icons/bi';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {sidebarItems.map((item: ISidebarItem) => (
            <SidebarItem key={item.href} label={item.label} href={item.href} icon={item.icon} />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => {
                signOut();
              }}
              label='Logout'
              icon={BiLogOut}
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
