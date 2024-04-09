import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useNotifications = (id: string) => {
  const url = id ? `/api/notifications/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
