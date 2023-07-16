'use client';

import IChildren from '@/interfaces/children';

import { UserContextProvider } from '@/hooks/useUser';

const UserProvider = ({ children }: IChildren) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
