'use client';

import SongItem from '../SongItem';

import ISong from '@/interfaces/song';

import useOnPlay from '@/hooks/useOnPlay';

interface Props {
  songs: ISong[];
}

const PageContent = ({ songs }: Props) => {
  const onPlay = useOnPlay(songs);

  if (!songs.length) {
    return <div>Não têm músicas disponíveis</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem
          song={song}
          key={song.id}
          onClick={(id: string) => onPlay(id)}
        />
      ))}
    </div>
  );
};

export default PageContent;
