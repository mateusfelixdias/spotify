import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface Props {
  href: string;
  label: string;
  icon: IconType;
  active: boolean;
}

const SidebarItem = ({ active, href, label, icon: Icon }: Props) => {
  return (
    <div>
      <Link
        href={href}
        className={twMerge(
          `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
          active && 'text-white'
        )}
      >
        <Icon size={20} />
        <p className="truncate w-full">{label}</p>
      </Link>
    </div>
  );
};

export default SidebarItem;
