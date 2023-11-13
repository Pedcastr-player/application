"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "../Icon";
import { RouteProps, Routes } from "@/types";

export default function Footer() {
  const pathname = usePathname();

  const routes: RouteProps[] = [
    {
      name: "Podcasts",
      iconName: "viewList",
      route: Routes.Home,
      isActive: pathname === Routes.Home,
    },
    {
      name: "Playlists",
      iconName: "headset",
      route: Routes.Playlists,
      isActive: pathname === Routes.Playlists,
    },
    {
      name: "Settings",
      iconName: "person",
      route: Routes.Settings,
      isActive: pathname === Routes.Settings,
    },
  ];

  return (
    <footer className="fixed z-10 bottom-0 h-16 w-full p-3 flex flex-row items-center justify-around bg-zinc-700 text-white">
      {routes.map(({ name, iconName, route, isActive }) => (
        <Link
          href={route}
          key={name}
          className="group flex flex-col items-center"
        >
          <Icon
            name={iconName}
            size={32}
            className={`icon-btn ${isActive ? "active" : ""}`}
          />
          <span className={`text-xs text-hover ${isActive ? "active" : ""}`}>
            {name}
          </span>
        </Link>
      ))}
    </footer>
  );
}
