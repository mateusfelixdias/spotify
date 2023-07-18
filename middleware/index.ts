import { NextRequest, NextResponse } from 'next/server';

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({
    req: request,
    res: response,
  });

  await supabase.auth.getSession();
  return response;
};

export default middleware;
