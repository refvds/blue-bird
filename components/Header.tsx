import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';

interface IHeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header: FC<IHeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <header className='border-b-[1px] border-neutral-800 p-5'>
      <div className='flex items-center gap-2'>
        {showBackArrow && (
          <BiArrowBack
            className='
              cursor-pointer
              hover:opacity-70
              transition
            '
            onClick={handleBack}
            color='white'
            size={20}
          />
        )}
        <h1 className='text-white text-xl font-semibold'>{label}</h1>
      </div>
    </header>
  );
};

export default Header;
