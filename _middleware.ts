import { NextRequest, NextResponse } from 'next/server';
import { jwt } from './utils';

export async function middleware(req: NextRequest) {
  try {
    await jwt.isValidToken(req.cookies.get('token') || '[]');
    return NextResponse.next();
  } catch (error) {
    const { protocol, host, pathname } = req.nextUrl;
    return NextResponse.redirect(
      `${protocol}//${host}/auth/login?p=${pathname}`
    );
  }
}

export const config = {
  matcher: ['/checkout/:path*'],
};
