"use client";

import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";

export default function AddBar() {
  const [url, setUrl] = useState("");

  async function getFeed() {
    if (!url.length) return console.log("vazio");
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        url,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  const debouncedGetFeed = useDebounce({ callback: getFeed });

  return (
    <div className="flex items-center p-3">
      <input
        className="bg-transparent input w-full text-sm"
        placeholder="Add a feed URL here"
        onChange={(e) => {
          setUrl(e.target.value);
          debouncedGetFeed();
        }}
      />
      <section className="fixed left-0 top-24 z-40 bg-zinc-400 h-36 w-full"></section>
    </div>
  );
}
