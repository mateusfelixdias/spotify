'use client';

import MediaItem from '../MediaItem';

import ISong from '@/interfaces/song';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

import useOnPlay from '@/hooks/useOnPlay';
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';

interface Props {
  songs: ISong[];
}

const Library = ({ songs }: Props) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const onPlay = useOnPlay(songs);

  const onUpload = () => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 text-md font-medium">Sua Biblioteca</p>
        </div>

        <div>
          <AiOutlinePlus
            size={20}
            onClick={onUpload}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem
            song={song}
            key={song.id}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
