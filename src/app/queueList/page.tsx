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
    const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
    
    useEffect(()=>{
        const fetchQueue = async () => {
            try {
                const data = await currentQueue();
                console.log(data)
                setTracks(data.queue);
                setCurrentTrack(data.currently_playing);
            } catch (error) {
                console.error("Error fetching queue:", error);
            }
        };

        // Fetch immediately on mount
        fetchQueue();
        
        // Set up interval to fetch every 5 seconds
        const intervalId = setInterval(fetchQueue, 5000);
        
        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(intervalId);
        
    },[])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl mt-14">คิวเพลง 🎵</h1>
        <div className="text-black text-center">
            
            {currentTrack && (
                <div>
                    <div className="flex items-center gap-2 justify-center">
                        <div className="flex  items-center justify-around bg-green-200 rounded-lg shadow-md w-64 p-2 my-5">
                            <img
                                src={currentTrack.album.images[0].url}
                                alt={currentTrack.name}
                                className="w-16 h16"
                            />
                            <div>
                                <p className="text-lg">{currentTrack.name}</p>
                                <p className="text-gray-500">{currentTrack.artists.map((artist) => artist.name).join(", ")}</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            )}

            {tracks.map((track, index) => (
            <div key={index} className="flex items-center gap-2 justify-center">
                <div className="flex  items-center justify-around bg-white rounded-lg shadow-md w-64 p-2 my-5">
                <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-16 h16"
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