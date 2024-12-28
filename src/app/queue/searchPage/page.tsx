"use client";

import { addQueue, searchSong } from "@/app/utils/spotify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ITrack {
  name: string;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  artists: Array<{ name: string }>;
  uri: string;
}

export default function SearchPage() {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const router = useRouter();

  useEffect(() => {
    searchSong(query).then((data) => {
      setTracks(data.tracks.items);
    });
  }, []);

  const AddtoQueue = (uri: string) => {
    addQueue(uri);
    alert("เพลงถูกเพิ่มเข้าคิวแล้ว");
    router.replace("/queueList");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl">ผลการค้นหา</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 text-black text-center">
        {tracks.map((track, index) => (
          <div
            key={index}
            className="flex items-center gap-5"
            onClick={() => AddtoQueue(track.uri)}
          >
            <div className="flex flex-col items-center gap-2 bg-white rounded-lg shadow-md w-36 p-4 h-52 transition-transform transform hover:scale-105">
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="w-32 h32"
              />
              <p className="text-lg">{track.name}</p>
              {/* <p>{track.artists.map((artist) => artist.name).join(", ")}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
