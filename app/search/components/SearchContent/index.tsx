'use client';

import ISong from '@/interfaces/song';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

interface Props {
  songs: ISong[];
}

const SearchContent = ({ songs }: Props) => {
  if (!songs.length) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        Nenhuma música encontrada
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem key={song.id} song={song} />
          </div>

          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
