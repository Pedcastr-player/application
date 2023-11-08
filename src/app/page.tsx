"use client";
import Layout from "@/components/Layout/Layout";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  async function getFeed(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
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

  return (
    <Layout>
      <p className="text-black">oi</p>
    </Layout>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <form className="container flex space-x-4 w-full">
    //     <input type="text" className="w-full p-2" onChange={e => setUrl(e.target.value)} value={url} />
    //     <button className="p-4 border-2 border-black bg-cyan-400 hover:opacity-60 hover:scale-105" onClick={getFeed}>Search</button>
    //   </form>
    // </main>
  );
}
