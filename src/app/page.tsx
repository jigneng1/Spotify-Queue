'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QueuePage(){
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        // Navigate to the searchPage with the query as a query parameter
        router.push(`searchPage?query=${encodeURIComponent(query)}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-5">
            <h1 className="text-2xl">ขอเพลงได้ตรงนี้เลยฮ้าป 👇🏻</h1>
            <input className="text-black border-2 border-gray-500 rounded-md p-2 text-sm w-72" onChange={(e)=> setQuery(e.target.value)}/>
            <button className="bg-green-500 p-2 rounded-md text-white uppercase" onClick={handleSearch}>Search</button>
        </div>
    )
}