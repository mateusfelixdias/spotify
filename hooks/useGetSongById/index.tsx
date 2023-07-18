import ISong from '@/interfaces/song';

import { toast } from 'react-hot-toast';

import { useEffect, useMemo, useState } from 'react';

import { useSessionContext } from '@supabase/auth-helpers-react';

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<ISong>({} as ISong);

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setIsLoading(false);
        toast.error(error.message);
        return;
      }

      setSong(data as ISong);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      song,
      isLoading,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
