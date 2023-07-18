'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { useSessionContext } from '@supabase/auth-helpers-react';

interface Props {
  songId: string;
}

const LikeButton = ({ songId }: Props) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const { user } = useUser();
  const authModal = useAuthModal();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { error, data } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) setIsLiked(true);
    };

    fetchData();
  }, [songId, user?.id, supabaseClient]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId);

      if (!error) setIsLiked(!isLiked);
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({ user_id: user.id, song_id: songId });

      if (!error) setIsLiked(!isLiked);
    }

    router.refresh();
  };

  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? '#22c55e' : '#ffffff'} />
    </button>
  );
};

export default LikeButton;
