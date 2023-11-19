"use client";

import { useState } from "react";

import { Dropdown } from "@/components/Dropdown";

enum SortOptions {
  name = "Name",
  added = "Recently Added",
  episode = "Recent Episode",
}

export default function SortBar() {
  const [sort, setSort] = useState<SortOptions>(SortOptions.added);

  return (
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
  );
}
