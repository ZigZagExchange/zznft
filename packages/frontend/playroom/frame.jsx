import React from "react";
import "./frame.css"
import {css} from "../helpers/css";

function FrameComponent({children}) {
  return <div className={css("bg-green-400")}>
    test frame
    {children}
  </div>
}

export default FrameComponent
