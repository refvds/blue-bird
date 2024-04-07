import React, { FC } from 'react';
import useUser from '@/hooks/useUser';
import Avatar from '../Avatar';
import Image from 'next/image';

interface IUserHeroProps {
  id: number;
}

const UserHero: FC<IUserHeroProps> = ({ id }) => {
  const { data: fetchedUser } = useUser(id);

  return (
    <div>
      <div className='bg-neutral-700 h-44 relative'>
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser?.coverImage} alt='Cover image' fill style={{ objectFit: 'cover' }} />
        )}
        <div className='absolute -bottom-16 left-4'>
          <Avatar id={id} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
