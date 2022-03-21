import React from "react"
import {css} from "../../helpers/css";

export enum PaneSize {
  sm = "sm",
  md = "md"
}

interface PaneProps {
  size?: PaneSize;
  title?: string
}

const sizeStyles = {
  [PaneSize.sm]: ["p-5"],
  [PaneSize.md]: ["p-8"]
}

const Pane: React.FC<PaneProps> = ({size = PaneSize.sm, title, children}) => {
  return <div className={css(sizeStyles[size], "bg-neutral-900", "h-full", "w-full")}>
    {title && <div className={css("mb-3", "text-xl")}>{title}</div>}
    {children}
  </div>
}

export default Pane
