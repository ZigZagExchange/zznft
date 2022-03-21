import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import {css} from "../../helpers/css";
import React from "react";

interface DropdownProps {
  trigger: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

const Dropdown = ({trigger, children}: DropdownProps) => {
  return <RadixDropdown.Root>
    <RadixDropdown.Trigger asChild>
      <div>{trigger}</div>
    </RadixDropdown.Trigger>

    <RadixDropdown.Content
      style={{minWidth: "200px"}}
      className={css("bg-neutral-800", "w-full", "mt-3", "px-2", "py-1", "text-white")}
    >
      {children}
    </RadixDropdown.Content>
  </RadixDropdown.Root>
}

interface ItemProps {
  children: JSX.Element
}

const Item = ({children}: ItemProps) => {
  return <RadixDropdown.Item>
    {children}
  </RadixDropdown.Item>
}

Dropdown.Item = Item
export default Dropdown