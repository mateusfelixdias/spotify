import { createContext, useContext, useEffect, useState } from 'react';

import IUserDetails from '@/interfaces/userDetails';
import ISubscription from '@/interfaces/subscription';

import { User } from '@supabase/auth-helpers-nextjs';
import {
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react';

export interface Props {
  [propName: string]: any;
}

interface IUserContext {
  user: User | null;
  isLoading: boolean;
  accessToken: string | null;
  userDetails: IUserDetails | null;
  subscription: ISubscription | null;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserContextProvider = (props: Props) => {
  const {
    session,
    supabaseClient,
    isLoading: isLoadingUser,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [subscription, setSubscription] = useState<ISubscription | null>(null);

  const getUserDetails = () => {
    return supabaseClient.from('users').select('*').single();
  };
  const getSubscription = () => {
    return supabaseClient
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();
  };

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        ([userDetails, subscription]) => {
          if (userDetails.status === 'fulfilled') {
            setUserDetails(userDetails.value.data as IUserDetails);
          }

          if (subscription.status === 'fulfilled') {
            setSubscription(subscription.value.data as ISubscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    user,
    userDetails,
    accessToken,
    subscription,
    isLoading: isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a userContextProvader.');
  }

  return context;
};
