import * as RadixDialog from '@radix-ui/react-dialog';
import {css} from "../../helpers/css";
import React from "react";
import {MdClose} from "react-icons/Md";

interface DialogProps extends React.ComponentProps<any> {
  open?: boolean;
  title?: string;
  description?: string;
  onChange: (value: boolean) => void;
}

const Modal = ({children, open, title, description, onChange}: DialogProps) => {
  return <RadixDialog.Root open={open} onOpenChange={(value) => onChange(value)}>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={css("fixed", "bg-black", "inset-0", "opacity-80")}/>
      <RadixDialog.Content
        style={{transform: "translate(-50%, -50%)", maxWidth: '450px'}}
        className={css("bg-neutral-900", "rounded-sm", "top-1/2", "left-1/2", "fixed", "w-9/12", "p-10", "text-white")}>
        <RadixDialog.Close style={{right: "5px", top: "5px"}}
                           className={css("absolute", "text-neutral-400", "hover:text-white")}>
          <MdClose size={"25px"}/>
        </RadixDialog.Close>
        <RadixDialog.Title className={css("text-white", "font-mono", "text-2xl", "font-bold", "text-center", "mb-12")}>
          {title}
        </RadixDialog.Title>
        <RadixDialog.Description>{description}</RadixDialog.Description>
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
}

export default Modal
