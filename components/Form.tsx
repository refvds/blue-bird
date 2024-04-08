import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import usePosts from '@/hooks/userPosts';
import axios from 'axios';
import React, { FC, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import Button from './Button';
import Avatar from './Avatar';

interface IFormProps {
  placeholder: string;
  postId?: string;
  isComment?: boolean;
}

const Form: FC<IFormProps> = ({ placeholder, postId, isComment }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/posts', { body });
      toast.success('Tweet created');

      setBody('');
      mutatePosts();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex flex-row gap-4'>
          <div>
            <Avatar id={currentUser?.id} />
          </div>
          <div className='w-full'>
            <textarea
              className='
              disabled:opacity-80
              peer
              resize-none
              mt-3
              w-full
              bg-black
              ring-0
              outline-none
              text-[20px]
              placeholder-neutral-500
              text-white
            '
              placeholder={placeholder}
              disabled={isLoading}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <hr
              className='
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-neutral-800
                transition
              '
            />
            <div className='mt-4 flex justify-end'>
              <Button disabled={isLoading} onClick={onSubmit} label='Tweet' />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1
            className='
          text-white
          text-2xl
          text-center
          mb-4
          font-bold
        '
          >
            Welcome to Blue Bird
          </h1>
          <div className='flex items-center justify-center gap-4'>
            <Button label='Login' onClick={loginModal.onOpen} />
            <Button label='Register' onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
