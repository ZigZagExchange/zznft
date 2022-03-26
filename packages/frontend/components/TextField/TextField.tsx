import {css} from "../../helpers/css";
import TextFieldStyles from "./TextField.styles";
import Spinner, {SpinnerSize} from "../Spinner/Spinner";

type BaseTextFieldProps =
  Pick<React.HTMLProps<HTMLInputElement>, "placeholder" | "name">

interface TextFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  name?: string;
  block?: boolean
}

const TextField = ({
  onChange,
  isLoading = false,
  disabled = false,
  value,
  name,
  placeholder,
  block
}: TextFieldProps & BaseTextFieldProps) => {
  return <div className={css("relative", {"block": block, "inline-block": !block})}>
    <input
      value={value}
      name={name}
      type={"text"}
      disabled={disabled || isLoading}
      placeholder={placeholder}
      onChange={e => {
        onChange && onChange(e.target.value)
      }}
      className={css(TextFieldStyles, {"w-full": block})}
    />
    {isLoading && <div
      className={css("w-full", "h-full", "absolute", "flex", "items-center", "justify-center")}
      style={{left: 0, top: 0}}>
      <Spinner size={SpinnerSize.sm}/>
    </div>}
  </div>
}

export default TextField
