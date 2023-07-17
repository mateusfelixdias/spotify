import { ReactNode } from 'react';

import { IoMdClose } from 'react-icons/io';

import * as Dialog from '@radix-ui/react-dialog';

interface Props {
  title: string;
  isOpen: boolean;
  description: string;
  children: ReactNode;
  onChange: (isOpen: boolean) => void;
}

const Modal = ({ children, description, isOpen, title, onChange }: Props) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />

        <Dialog.Content className="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[28.125rem] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 px-[1.5625rem] py-[0.6rem] focus:outline-none">
          <Dialog.Title className="text-xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>

          <Dialog.Description className="mb-5 text-sm leading-normal text-center">
            {description}
          </Dialog.Description>

          <div>{children}</div>

          <Dialog.Close>
            <button className="text-neutral-400 hover:text-white absolute top-[0.62rem] right-[0.62rem] inline-flex h-[1.5625rem] w-[1.5625rem] appearance-none items-center justify-center rounded-full focus:outline-none">
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
