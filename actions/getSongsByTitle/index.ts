import getSongs from '../getSongs';

import ISong from '@/interfaces/song';

import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const getSongsByTitle = async (title: string) => {
  const supabase = createServerComponentClient({ cookies });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });

  if (error) console.log(error.message);

  return (data as ISong[]) ?? [];
};

export default getSongsByTitle;
