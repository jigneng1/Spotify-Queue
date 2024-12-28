'use client'
import { useState } from "react";
import { searchSong } from "../utils/spotify";
import { useRouter } from "next/navigation";

export default function QueuePage(){
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        // Navigate to the searchPage with the query as a query parameter
        router.push(`/queue/searchPage?query=${encodeURIComponent(query)}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl">ขอเพลงได้ตรงนี้เลยฮ้าป 👇🏻</h1>
            <input className="text-black" onChange={(e)=> setQuery(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}