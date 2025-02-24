import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('token');

  if (!jwt) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await jwtVerify(jwt.value, secret);

  } catch (error) {
    console.error('JWT Verification Error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  } finally {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/inventory', '/sales', '/users', '/admin'],
};
