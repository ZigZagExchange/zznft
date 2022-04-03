import {css} from "../helpers/css";

interface FiveHundredErrorProps {
  children?: string
}

const FiveHundredError = ({children}: FiveHundredErrorProps) => {
  return <div className={css("w-full", "h-full", "flex", "justify-center", "items-center")}>
    <div>fataility. something went wrong. most likely will be fixed shortly.</div>
    {children && <div>{children}</div>}
  </div>
}

export default FiveHundredError
