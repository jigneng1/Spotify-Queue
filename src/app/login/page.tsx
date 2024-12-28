'use client';

import { LOGIN_URL } from "../utils/spotify";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => window.location.href = LOGIN_URL}
        className="px-6 py-3 bg-green-500 text-white rounded-full"
      >
        Login with Spotify
      </button>
    </div>
  );
}