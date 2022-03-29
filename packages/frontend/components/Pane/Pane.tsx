import React from "react"
import {css} from "../../helpers/css";

export enum PaneSize {
  sm = "sm",
  md = "md"
}

export enum PaneType {
  Dark = "dark",
  Light = "light"
}

const sizeStyles = {
  [PaneSize.sm]: ["p-5"],
  [PaneSize.md]: ["p-8"]
}

const typeStyles = {
  [PaneType.Dark]: ["bg-black"],
  [PaneType.Light]: ["bg-neutral-900"]
}


interface PaneProps {
  size?: PaneSize;
  title?: string;
  className?: string;
  type?: PaneType
}

const Pane: React.FC<PaneProps> = ({size = PaneSize.sm, type = PaneType.Light, title, className, children}) => {
  return <div className={css(sizeStyles[size], typeStyles[type], "h-full", "w-full", className)}>
    {title && <div className={css("mb-3", "text-xl")}>{title}</div>}
    {children}
  </div>
}

export default Pane
