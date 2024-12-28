export const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
export const REDIRECT_URI = 'http://localhost:3000/callback';
export const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

export const LOGIN_URL = `${SPOTIFY_AUTHORIZE_URL}?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state`;

// can refacetor by keeping the token in the local storage
const getAcessToken = async () => {
    try {
        const response = await fetch(SPOTIFY_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic NDdkNjQ3ZGZjZDk1NDU4ZjkzY2E1YWVhYzQ0NTFkNGY6ZDAyY2I0Nzk2YTIwNGUwYjhmMTIwZjFkM2VjNTY4YjE=`
            },
            body: new URLSearchParams({
                'grant_type': 'refresh_token',
                'refresh_token': "AQA3cnOvrDcDBcVMzqbKUWOcu6D5TqArp8fQGAy7XRqXE_UapepRWGYeg7SGpZh5gQh-sb9QTNcq-cr2zgoQRwZ3s15-TcCHMjFlFO3hb_MgMR7PSvyWumpYoOIHfT4Q-pk"
            }).toString()
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        return error;
    }
}



export const getNowPlaying = async () => {
    try {
        const acess_token = await getAcessToken();
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers : {
                'Authorization' : `Bearer ${acess_token}`
            }
        });
        return response.json();
    } catch (error) {
        return error;
    }
};

export const searchSong = async (query: string) => {
    const acess_token = await getAcessToken();
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            headers : {
                'Authorization' : `Bearer ${acess_token}`
            }
        });
        return response.json();
    } catch (error) {
        return error;
    }
}; 

export const addQueue = async (uri : string) => {
    const acess_token = await getAcessToken();
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
            method: 'POST',
            headers : {
                'Authorization' : `Bearer ${acess_token}`
            }
        });
        return response.json();
    } catch (error) {
        return error;
    }
}

export const currentQueue = async () => {
    const acess_token = await getAcessToken();
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/queue`, {
            headers : {
                'Authorization' : `Bearer ${acess_token}`
            }
        });
        return response.json();
    } catch (error) {
        return error;
    }
}