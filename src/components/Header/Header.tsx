"use client"

import { useState } from "react";

import Icon from "../Icon/Icon";

enum ActionsToIcon {
  sort = "list",
  search = "search",
  add = "add"
}

export default function Header() {
  const [activeAction, setActiveAction] = useState<null | ActionsToIcon>(null)

  function handleClick(value: ActionsToIcon) {
    if (value === activeAction) {
      return setActiveAction(null)
    }
    setActiveAction(value)
  }

  function getButtonTitle(value: ActionsToIcon) {
    switch (value) {
      case "add":
        return "Add a new podcast";
      case "search":
        return "Search your podcasts"
      default:
        return "List Options"
    }
  }

  function getActiveActionStyle(value: ActionsToIcon) {
    return value === activeAction ? "icon-btn-active" : ""
  }

  return (
    <>
    <header className="fixed z-30 h-12 w-full p-3 flex flex-row bg-zinc-700 align-center justify-between">
      <h1>Your Podcasts</h1>
      <section className="flex flex-row gap-3">
        {Object.entries(ActionsToIcon).map(entry => {
          const value = entry[1]
          const className = `icon-btn ${getActiveActionStyle(entry[1])}`

          return <button
            onClick={() => handleClick(value)}
            key={value}
            className={className}
            title={getButtonTitle(value)}
          >
            <Icon name={value} />
          </button>
        })}
      </section>
    </header>
    <section aria-hidden={!activeAction} className={`fixed z-20 ${activeAction ? "top-12" : "top-0"} h-12 w-full bg-zinc-500 duration-200`}>
        
    </section>
    </>
  )
}