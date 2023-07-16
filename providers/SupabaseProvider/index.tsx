'use client';

import { useState } from 'react';

import { Database } from '@/types_db';

import IChildren from '@/interfaces/children';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SupabaseProvaider = ({ children }: IChildren) => {
  const [supabaseClient] = useState(() => {
    return createClientComponentClient<Database>();
  });

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvaider;
