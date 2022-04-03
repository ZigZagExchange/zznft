import FourOFourError from "../../pages/404";
import FiveHundredError from "../../pages/500";
import {css} from "../../helpers/css";
import {ErrorCodes} from "../../interfaces";

interface ErrorProps {
  statusCode: ErrorCodes;
  children: string;
}

const Error = ({statusCode, children}: ErrorProps) => {
  if (statusCode === 404) {
    return <FourOFourError>{children}</FourOFourError>
  } else if (statusCode === 500) {
    return <FiveHundredError>{children}</FiveHundredError>
  } else return <div className={css("w-full", "h-full", "flex", "justify-center", "items-center")}>
    {children}
  </div>
}

export default Error
