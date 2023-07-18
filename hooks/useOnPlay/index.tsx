import ISong from '@/interfaces/song';

import usePlayer from '../usePlayer';
import { useUser } from '../useUser';
import useAuthModal from '../useAuthModal';

const useOnPlay = (songs: ISong[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();

  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) return authModal.onOpen();

    player.setId(id);
    player.setIds(songs.map(({ id }) => id));
  };

  return onPlay;
};

export default useOnPlay;
