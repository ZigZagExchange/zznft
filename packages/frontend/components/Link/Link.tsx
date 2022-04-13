import NextLink from "next/link"
import {css} from "../../helpers/css";
import {CgExternal} from "react-icons/cg";
import React from "react";

interface LinkProps {
  isExternal?: boolean;
  href: string;
  children?: string;
  type?: LinkType;
  size?: LinkSize
}

const Link: React.FC<LinkProps> = ({isExternal, href, children, type = LinkType.Primary, size = LinkSize.sm}: LinkProps) => {
  const styles = css(linkTypeStyles[type], linkSizeStyles[size])

  return <>
    {isExternal ? <a
      href={href}
      className={css(styles, "inline-flex", "items-center")}
      target={isExternal ? "_blank" : "_self"}
      rel={"noreferrer"}
    >
      {children && children}
      <span className={css("ml-2")}>
        <CgExternal size={size === LinkSize.sm ? "16px" : "18px"}/>
      </span>
    </a>
    : <NextLink href={href}>
        <a className={css(styles)}>
          {children && children}
        </a>
      </NextLink>}
  </>
}

export enum LinkType {
  Primary = "primary",
  Secondary = "secondary",
  Grey = "grey"
}

export enum LinkSize {
  sm = "sm",
  lg = "lg"
}

const baseLinkStyles = css("hover:underline", "hover:cursor-pointer")

const linkTypeStyles = {
  [LinkType.Primary]: css("text-white", "hover:text-zz-150", baseLinkStyles),
  [LinkType.Secondary]: css("text-white", baseLinkStyles),
  [LinkType.Grey]: css("text-neutral-400", "hover:text-zz-150", baseLinkStyles)
}

const linkSizeStyles = {
  [LinkSize.sm]: css("text-md"),
  [LinkSize.lg]: css("text-lg")
}


export default Link
