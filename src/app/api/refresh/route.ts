import { SPOTIFY_TOKEN_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "@/app/utils/spotify";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { refresh_token } = await request.json();
    
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    });
  
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: params.toString(),
    });
  
    const data = await response.json();
    return NextResponse.json(data);
  }