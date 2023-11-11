"use client";

import { Layout } from "@/components/Layout";
import { HeaderActionProps } from "@/components/Header/Header";
import { Dropdown } from "@/components/Dropdown";
import { useState } from "react";

enum SortOptions {
  name = "Name",
  added = "Recently Added",
  episode = "Recent Episode",
}

export default function Home() {
  const [sort, setSort] = useState<SortOptions>(SortOptions.added);
  // const [url, setUrl] = useState("");

  // async function getFeed(e: React.MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  //   if (!url.length) return console.log("vazio");
  //   const response = await fetch("/api", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       url,
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // }

  const headerActions: HeaderActionProps[] = [
    {
      iconName: "list",
      actionDescription: "List Options",
      actionNode: (
        <section className="flex items-center justify-between p-2 px-3">
          <p className="text-sm">Order By:</p>
          <Dropdown.Root>
            <Dropdown.Trigger>{sort}</Dropdown.Trigger>
            <Dropdown.Content className="text-black space-y-1 p-3">
              {Object.values(SortOptions).map((option) => (
                <Dropdown.Item key={option} onClick={() => setSort(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>
        </section>
      ),
    },
    {
      iconName: "search",
      actionDescription: "Search your podcasts",
      actionNode: (
        <div className="flex items-center p-3">
          <input
            className="bg-transparent input w-full text-sm"
            placeholder="Filter your podcasts"
          />
        </div>
      ),
    },
    {
      iconName: "add",
      actionDescription: "Add a new podcast",
      actionNode: (
        <div className="flex items-center p-3">
          <input
            className="bg-transparent input w-full text-sm"
            placeholder="Add a feed URL here"
          />
        </div>
      ),
    },
  ];

  return (
    <Layout
      headerSettings={{
        title: "Your Podcasts",
        actions: headerActions,
      }}
    >
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
