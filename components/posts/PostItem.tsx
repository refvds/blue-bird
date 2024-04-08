import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo } from 'react';
import Avatar from '../Avatar';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';

interface IPostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: FC<IPostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      loginModal.onOpen();
    },
    [loginModal]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      className='
      border-b-[1px]
      border-neutral-800
      p-5
      cursor-pointer
      hover:bg-neutral-900
      transition
    '
      onClick={goToPost}
    >
      <div className='flex items-start gap-3'>
        <Avatar id={data.user.id} />
        <div>
          <div className='flex items-center gap-2'>
            <p
              className='
              text-white
              font-semibold
              cursor-pointer
              hover:underline
            '
              onClick={goToUser}
            >
              {data.user.name}
            </p>
            <span
              className='
              text-neutral-500
              cursor-pointer
              hover:underline
              hidden
              md:block
            '
              onClick={goToUser}
            >
              @{data.user.username}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
          <div className='flex items-center mt-3 gap-10'>
            <div
              className='
              flex 
               items-center
               text-neutral-500
               gap-2
               cursor-pointer
               transition
               hover:text-sky-500
            '
              // onClick={}
            >
              <AiOutlineMessage size={20} />
              <p>{data.comment?.length || 0}</p>
            </div>
            <div
              className='
              flex 
               items-center
               text-neutral-500
               gap-2
               cursor-pointer
               transition
               hover:text-pink-500
            '
              onClick={onLike}
            >
              <AiOutlineHeart size={20} />
              <p>{data.comment?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
