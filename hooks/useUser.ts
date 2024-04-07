import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUser = (id: any) => {
  const { data, error, isLoading, mutate } = useSWR(id ? `/api/users/${id}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
