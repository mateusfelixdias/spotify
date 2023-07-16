'use client';

import Image from 'next/image';

import { FaPlay } from 'react-icons/fa';

import { useRouter } from 'next/navigation';

interface Props {
  name: string;
  href: string;
  image: string;
}

const ListItem = ({ href, image, name }: Props) => {
  const router = useRouter();

  const onAddHref = () => router.push(href);

  return (
    <button
      onClick={() => onAddHref()}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[4rem] min-w-[4rem]">
        <Image fill className="object-cover" src={image} alt="Image" />
      </div>

      <p className="font-medium truncate py-5">{name}</p>

      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
