import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { code } = await request.json();
  
  const body = new URLSearchParams({
    code: code,
    redirect_uri: 'http://localhost:3000/callback',
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
  });

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to exchange code for token' },
      { status: 500 }
    );
  }
}