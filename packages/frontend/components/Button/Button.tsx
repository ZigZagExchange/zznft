import React from "react";
import classNames, {Argument} from "classnames";

export enum ButtonType {
  Primary = 'primary',
  Error = 'error',
  Black = 'black'
}

export enum ButtonSize {
  sm = 'sm',
  lg = 'lg'
}

const buttonHoverStyle = ["hover:bg-gradient-to-r", "from-zz-50", "via-zz-100","to-zz-150"]

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
  children: any;
  variant?: ButtonType,
  size?: ButtonSize,
  block?: boolean,
  className?: Argument
}

const Button = ({
                  onClick,
                  children,
                  variant = ButtonType.Primary,
                  size = ButtonSize.sm,
                  block,
                  className
}: ButtonProps) => {
  return <button
    onClick={onClick && onClick}
    className={classNames(buttonVariantStyles[variant], buttonSizeStyles[size], "font-mono", {"w-full": block}, className)}
  >
    {children}
  </button>
}

export default Button
