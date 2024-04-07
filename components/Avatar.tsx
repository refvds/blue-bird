import useUser from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, SyntheticEvent, useCallback } from 'react';

interface IAvatarProps {
  id: number;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: FC<IAvatarProps> = ({ id, isLarge, hasBorder }) => {
  const { data: fetechedUser } = useUser(id);
  const router = useRouter();

  const onClick = useCallback(
    (event: SyntheticEvent<HTMLDivElement>) => {
      event.stopPropagation();

      const url = `/users/${id}`;
      router.push(url);
    },
    [router, id]
  );

  return (
    <div
      className={`
    ${hasBorder ? 'border-4 border-black' : ''}
    ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}
    rounded-full
    hover:opacity-90
    transition
    cursor-pointer
    relative
  `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        alt='Avatar'
        onClick={onClick}
        src={fetechedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  );
};

export default Avatar;
