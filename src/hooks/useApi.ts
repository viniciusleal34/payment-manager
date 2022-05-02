import useSWR from 'swr';
import api from '../factory/api';

export default function useApi(url:string) {
  const { data, error, mutate } = useSWR(
    url,
    async () => {
      const response = await api.get(url);
      return response.data;
    },
    {}
  );
  return { data, error, mutate };
}
