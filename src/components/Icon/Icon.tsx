import { createElement } from "react";
import add from "./svgs/add.svg";
import headset from "./svgs/headset.svg";
import list from "./svgs/list.svg";
import person from "./svgs/person.svg";
import search from "./svgs/search.svg";
import viewList from "./svgs/view-list.svg";

const IconList = {
  add,
  headset,
  list,
  person,
  search,
  viewList,
};

export type IconName = keyof typeof IconList;

type Props = {
  name: IconName;
  size?: number;
  className?: string;
};

export default function Icon({ name, size = 24, className = "" }: Props) {
  return createElement(IconList[name], {
    width: size,
    height: size,
    className,
  });
}
