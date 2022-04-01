import NextLink from "next/link"
import {css} from "../../helpers/css";
import {CgExternal} from "react-icons/Cg";


interface LinkProps {
  isExternal?: boolean;
  href: string;
  children: string;
}

const Link: React.FC<LinkProps> = ({isExternal, href, children}: LinkProps) => {
  return <>
    {isExternal ? <StyledLink href={href} isExternal={isExternal}>
        <span className={css("flex", "items-center")}>
          {children}
          <span className={css("ml-2")}>
            <CgExternal/>
          </span>
        </span>
      </StyledLink>
      : <NextLink href={href}>
        <StyledLink isExternal={isExternal}>
          {children}
        </StyledLink>
      </NextLink>}
  </>
}

interface StyledLinkProps {
  href?: string;
  children: any;
  isExternal?: boolean
}

const StyledLink: React.FC<StyledLinkProps> = ({href, isExternal, children}) => {
  return <a
    href={href}
    className={css("hover:underline", "hover:cursor-pointer", "hover:text-zz-150")}
    target={isExternal ? "_blank" : "_self"}
    rel={"noreferrer"}>
    {children}
  </a>
}


export default Link
