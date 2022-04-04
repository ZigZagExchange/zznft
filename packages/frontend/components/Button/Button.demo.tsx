import Demo, {SubDemo} from "../Demo/Demo";
import Button from "./Button";
import {successToast} from "../Toast/toast";
import {css} from "../../helpers/css";

const ButtonDemo = () => {
  return <Demo title={"Button"}>
    <div className={css("grid", "grid-cols-2", "gap-5")}>
      <SubDemo title={"Normal Button"}>
        <Button onClick={() => successToast("Nice click")}>click me</Button>
      </SubDemo>
      <SubDemo title={"Disabled"}>
        <Button onClick={() => successToast("Nice click")} disabled>click me</Button>
      </SubDemo>
    </div>
  </Demo>
}

export default ButtonDemo
