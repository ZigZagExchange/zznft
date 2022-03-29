import React from "react";
import classNames, {Argument} from "classnames";
import {css} from "../../helpers/css";

export enum ButtonType {
  Primary = 'primary',
  Error = 'error',
  Black = 'black'
}

export enum ButtonSize {
  sm = 'sm',
  lg = 'lg'
}

const buttonHoverStyle = ["hover:bg-gradient-to-r", "from-zz-50", "via-zz-100", "to-zz-150"]

const buttonVariantStyles = {
  [ButtonType.Primary]: ["bg-neutral-800", ...buttonHoverStyle],
  [ButtonType.Black]: ["bg-black", ...buttonHoverStyle],
  [ButtonType.Error]: ["bg-red-200"]
}

const buttonSizeStyles = {
  [ButtonSize.sm]: ["px-3", "py-1", "font-sm"],
  [ButtonSize.lg]: ["p-4", "font-md"]
}

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType,
  size?: ButtonSize,
  block?: boolean,
  className?: Argument
}

const Button: React.FC<ButtonProps> = ({
                                         onClick,
                                         children,
                                         type = ButtonType.Primary,
                                         size = ButtonSize.sm,
                                         block,
                                         className
                                       }) => {
  return <button
    type={"button"}
    onClick={onClick && onClick}
    className={css(buttonVariantStyles[type], buttonSizeStyles[size], "font-mono", {"w-full": block}, className)}
  >
    {children}
  </button>
}

interface SubmitProps extends Pick<ButtonProps, "onClick" | "block"> {
  label?: string;
}

export const Submit: React.FC<SubmitProps> = ({onClick, label}) => {
  return <button onClick={onClick && onClick}
                 className={css(buttonVariantStyles[ButtonType.Primary], buttonSizeStyles[ButtonSize.sm])}
                 type={"submit"}>
    {label ? label : "Submit"}
  </button>
}

export default Button
