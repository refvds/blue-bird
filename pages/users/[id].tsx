import Header from '@/components/Header';
import PostFeed from '@/components/posts/PostFeed';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const UserView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: fetchedUser, isLoading } = useUser(id);

  if (isLoading || !fetchedUser) {
    return (
      <div
        className='
          flex
          justify-center
          items-center
          h-full
        '
      >
        <ClipLoader color='lightblue' size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero id={Number(id)} />
      <UserBio id={Number(id)} />
      <PostFeed />
    </>
  );
};

export default UserView;
