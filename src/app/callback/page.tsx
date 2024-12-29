'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    async function getToken() {
       const code = searchParams.get('code');
       console.log(code);      
      if (code) {
        try {
          const response = await fetch('/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          
          // Store tokens in localStorage or your preferred storage method
          localStorage.setItem('spotify_access_token', data.access_token);
          localStorage.setItem('spotify_refresh_token', data.refresh_token);
          localStorage.setItem('spotify_token_expiry', 
            (Date.now() + data.expires_in * 1000).toString()
          );
          
         router.push('/'); // Redirect to your app's main page
        } catch (error) {
          console.error('Error getting token:', error);
          router.push('/'); // Redirect back to login on error
        }
      }
    }

    getToken();
  }, [searchParams, router]);

  return <div>Loading...</div>;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Callback />
    </Suspense>
  );
}