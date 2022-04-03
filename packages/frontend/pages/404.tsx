import { css } from "../helpers/css"

interface FourOFourErrorProps {
  children?: string
}

const FourOFourError = ({children}: FourOFourErrorProps) => {
  return <div className={css("w-full", "h-full", "flex", "justify-center", "items-center")}>
    <div>woops, we couldn't find what you were looking for</div>
    {children && <div>{children}</div>}
  </div>
}

export default FourOFourError
