import { useRouter } from 'next/router';
import React from 'react';
import { BsTwitter } from 'react-icons/bs';

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      className='
      h-14
      w-14
      rounded-full
      flex
      items-center
      justify-center
      hover:bg-blue-300
      hover:bg-opacity-10
      cursor-pointer
      transition
    '
      onClick={() => router.push('/')}
    >
      <BsTwitter size={28} color='white' />
    </div>
  );
};

export default SidebarLogo;
