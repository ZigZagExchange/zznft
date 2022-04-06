import React from "react";
import classNames, {Argument} from "classnames";
import {css} from "../../helpers/css";
import {useFormState} from "react-final-form";

export enum ButtonType {
  Primary = 'primary',
  Error = 'error',
  Black = 'black'
}

export enum ButtonSize {
  sm = 'sm',
  lg = 'lg'
}

const baseButtonStyles = css("disabled:cursor-not-allowed", "font-mono")
const buttonHoverStyle = css("hover:bg-gradient-to-r", "from-zz-50", "via-zz-100", "to-zz-150", "disabled:hover:bg-neutral-100")

const buttonVariantStyles = {
  [ButtonType.Primary]: css("bg-neutral-800", "disabled:bg-neutral-800", baseButtonStyles),
  [ButtonType.Black]: css("bg-black", "disabled:bg-black", baseButtonStyles),
  [ButtonType.Error]: css("bg-red-200", "disabled:bg-red-200", baseButtonStyles)
}

const buttonSizeStyles = {
  [ButtonSize.sm]: css("px-3", "py-1", "font-sm"),
  [ButtonSize.lg]: css("p-4", "font-md")
}

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType,
  size?: ButtonSize,
  block?: boolean,
  className?: Argument;
  disabled?: boolean;
  isSubmit?: boolean
}

const Button: React.FC<ButtonProps> = ({
                                         onClick,
                                         children,
                                         type = ButtonType.Primary,
                                         size = ButtonSize.sm,
                                         block,
                                         className,
                                         disabled,
                                         isSubmit
                                       }) => {
  return <button
    disabled={disabled}
    type={isSubmit ? "submit" : "button"}
    onClick={onClick && onClick}
    className={css(buttonVariantStyles[type], buttonSizeStyles[size], {"w-full": block, [buttonHoverStyle]: !disabled}, className)}
  >
    {children}
  </button>
}



interface SubmitProps extends ButtonProps{
  label?: string;
}

export const Submit: React.FC<SubmitProps> = ({label, disabled, ...rest}) => {
  const {submitting} = useFormState()
  return <Button isSubmit disabled={submitting || disabled} {...rest}>{label ? label : "Submit"}</Button>
}

export default Button
