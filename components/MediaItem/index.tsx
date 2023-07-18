'use client';

import Image from 'next/image';

import ISong from '@/interfaces/song';

import useLoadImage from '@/hooks/useLoadImage';

interface Props {
  song: ISong;
  onClick?: (id: string) => void;
}

const MediaItem = ({ song, onClick }: Props) => {
  const imagePath = useLoadImage(song);

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/5 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[2.5rem] min-w-[2.5rem] overflow-hidden">
        <Image
          fill
          alt="Image"
          className="object-cover"
          src={imagePath ?? '/images/liked.webp'}
        />
      </div>

      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{song.title}</p>

        <p className="text-neutral-400 text-sm truncate">{song.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
