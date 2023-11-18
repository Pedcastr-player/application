import { AddBar, FilterBar, SortBar } from "@/pages/podcasts";

import { Layout } from "@/components/Layout";
import { HeaderActionProps } from "@/components/Header/Header";

export default function Home() {
  const headerActions: HeaderActionProps[] = [
    {
      iconName: "list",
      actionDescription: "List Options",
      actionNode: <SortBar />,
    },
    {
      iconName: "search",
      actionDescription: "Search your podcasts",
      actionNode: <FilterBar />,
    },
    {
      iconName: "add",
      actionDescription: "Add a new podcast",
      actionNode: <AddBar />,
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
