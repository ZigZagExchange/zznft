import React from "react";
import classNames from "classnames";

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary'
}

export enum ButtonSize {
  sm = 'sm',
  lg = 'lg'
}

interface ButtonProps {
  onClick?: () => void;
  children: any;
  variant?: ButtonType,
  size?: ButtonSize
}

const buttonVariantStyles = {
  [ButtonType.Primary]: ["bg-neutral-800", "hover:bg-gradient-to-r", "from-cyan-500", "to-blue-700"],
  [ButtonType.Secondary]: ["bg-red-200"]
}

const buttonSizeStyles = {
  [ButtonSize.sm]: ["px-3", "rounded-sm", "font-sm"],
  [ButtonSize.lg]: ["p-2", "rounded-md", "font-md"]
}

const Button = ({onClick, children, variant = ButtonType.Primary, size = ButtonSize.sm}: ButtonProps) => {
  return <button
    onClick={onClick && onClick}
    className={classNames(buttonVariantStyles[variant], buttonSizeStyles[size], "font-mono")}
  >
    {children}
  </button>
}

export default Button
