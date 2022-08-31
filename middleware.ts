import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { origin, pathname } = req.nextUrl;

  if (!session) {
    return NextResponse.redirect(`${origin}/auth/login?p=${pathname}`);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/checkout/:path*'] };
