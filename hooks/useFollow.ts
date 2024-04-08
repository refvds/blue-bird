import { useCallback, useMemo } from 'react';
import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';
import useUser from './useUser';
import toast from 'react-hot-toast';
import axios from 'axios';

const useFollow = (id: number) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(id);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(id);
  }, [id, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follow', { data: { id: String(id) } });
      } else {
        request = () => axios.post('/api/follow', { id: String(id) });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }, [currentUser, isFollowing, id, loginModal, mutateCurrentUser, mutateFetchedUser]);

  return { isFollowing, toggleFollow };
};

export default useFollow;
