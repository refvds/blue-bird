import React, { FC, useMemo } from 'react';
import { format } from 'date-fns';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import Button from '../Button';
import { BiCalendar } from 'react-icons/bi';
import useEditModal from '@/hooks/useEditModal';

interface IUserBioProps {
  id: number;
}

const UserBio: FC<IUserBioProps> = ({ id }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(id);

  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) return null;

    return format(new Date(fetchedUser?.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt]);

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        {currentUser?.id === id ? (
          <Button secondary label='Edit' onClick={editModal.onOpen} />
        ) : (
          <Button onClick={() => {}} label='Follow' secondary />
        )}
      </div>
      <div className='mt-8 px-4'>
        <div className='flex flex-col'>
          <p className='text-white text-2xl font-semibold'>{fetchedUser?.name}</p>
          <p className='text-md text-neutral-500'>@{fetchedUser?.username}</p>
        </div>
        <div className='flex flex-col mt-4'>
          <p className='text-white'>{fetchedUser?.bio}</p>
          <div className='flex items-center gap-2 mt-4 text-neutral-500'>
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className='flex items-center mt-4 gap-6'>
          <div className='flex items-center gap-1'>
            <p className='text-white'>{fetchedUser?.followingIds?.length}</p>
            <p className='text-neutral-500'>Following</p>
          </div>
          <div className='flex items-center gap-1'>
            <p className='text-white'>{fetchedUser?.followersCount}</p>
            <p className='text-neutral-500'>Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
