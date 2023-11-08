import { createElement } from "react";
import add from "./svgs/add.svg";
import list from "./svgs/list.svg";
import search from "./svgs/search.svg";

type IconName = "add" | "list" | "search"

type Props = {
  name: IconName
  size?: number
  className?: string
} 

const IconList = {
  add,
  list,
  search
}

export default function Icon({name, size=24, className=""}: Props) {
  return createElement(
    IconList[name],
    { width: size, height: size, className }
  )
}