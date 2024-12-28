'use client';

import { useEffect, useState } from "react";
import { currentQueue } from "../utils/spotify";

interface ITrack{
    name : string;
    album : {
        name : string;
        images : Array<{url : string}>;
    };
    artists : Array<{name : string}>;
}

export default function QueueList() {
    const [tracks, setTracks] = useState<ITrack[]>([]);
    
    useEffect(()=>{
        currentQueue().then((data) => {
            setTracks(data.queue);
        })
    },[])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl">QueueList</h1>
        <div className="text-black text-center">
            {tracks.map((track, index) => (
            <div key={index} className="flex items-center gap-5">
                <div className="flex  items-center justify-evenly gap-2 bg-white rounded-lg shadow-md w-96 p-2 my-5">
                <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-32 h32"
                />
                <div>
                <p className="text-lg">{track.name}</p>
                <p className="text-gray-500">{track.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    )
}