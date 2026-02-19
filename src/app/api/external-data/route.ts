import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or malformed Authorization header' }, { status: 401 });
  }

  const token = authHeader.slice(7); // strip "Bearer "
  const parts = token.split('.');
  if (parts.length !== 3) {
    return NextResponse.json({ error: 'Invalid JWT format' }, { status: 401 });
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    headers: { Authorization: authHeader },
    cache: 'no-store',
  });

  const data = await response.json();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, private',
    },
  });
}
