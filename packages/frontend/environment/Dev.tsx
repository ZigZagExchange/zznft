import React, {useState} from "react"
import {isDev} from "./index";
import Button, {ButtonType} from "../components/Button/Button";
import {css} from "../helpers/css";


const Dev: React.FC = ({children}) => {
  if (isDev()) {
    return <>
      {children}
    </>
  } else return null
}

export const DevToggle: React.FC = ({children}) => {
  const [show, setShow] = useState(false)
  return <Dev>
    <div className={css("flex", "my-2", "p-5")}>
      <div>
        <Button variant={ButtonType.Black} onClick={() => setShow(!show)}>
          {show ? "-" : "+"}
          <div className={css("text-xs", "text-center", "text-pink-400")}>dev</div>
        </Button>
      </div>
      {show && <div className={css("ml-5")}>{children}</div>}
    </div>
  </Dev>
}

export default Dev
