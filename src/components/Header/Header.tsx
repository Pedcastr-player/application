"use client";

import { useState } from "react";

import Icon, { IconName } from "../Icon/Icon";

export type HeaderActionProps = {
  iconName: IconName;
  actionDescription: string;
  actionNode: React.ReactNode;
};

export type HeaderProps = {
  title: string;
  actions: HeaderActionProps[];
};

export default function Header({ title, actions }: HeaderProps) {
  const [activeAction, setActiveAction] = useState<null | IconName>(null);

  function handleClick(value: IconName) {
    if (value === activeAction) {
      return setActiveAction(null);
    }
    setActiveAction(value);
  }

  function getActiveActionStyle(value: IconName) {
    return value === activeAction ? "active" : "";
  }

  const activeActionNode = actions.find(
    (action) => action.iconName === activeAction
  );

  return (
    <>
      <header className="fixed z-30 h-12 w-full p-3 flex flex-row bg-zinc-700 items-center justify-between">
        <h1>{title}</h1>
        <section className="flex flex-row gap-3">
          {actions.map(({ iconName, actionDescription }) => {
            const className = `icon-btn ${getActiveActionStyle(iconName)}`;

            return (
              <button
                onClick={() => handleClick(iconName)}
                key={iconName}
                title={actionDescription}
              >
                <Icon name={iconName} className={className} />
              </button>
            );
          })}
        </section>
      </header>
      <section
        aria-hidden={!activeActionNode}
        className={`fixed z-20 ${
          activeActionNode ? "top-12" : "top-0"
        } h-12 w-full bg-zinc-500 duration-200`}
      >
        {activeActionNode?.actionNode}
      </section>
    </>
  );
}
