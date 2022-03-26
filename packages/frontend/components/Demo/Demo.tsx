import {css} from "../../helpers/css";
import Pane, {PaneType} from "../Pane/Pane";

const Demo: React.FC<{title: string}> = ({title, children}) => {
  return <div className={css("flex", "justify-center")}>
    <div style={{maxWidth: "500px"}} className={css("w-full")}>
      <Pane type={PaneType.Dark} title={title} className={css("border-2", "border-dashed", "border-neutral-700", "flex", "flex-col", "gap-3")}>
        {children}
      </Pane>
    </div>
  </div>
}

export const SubDemo: React.FC<{title: string}> = ({title, children}) => {
  return <div>
    <div className={css("text-sm", "text-neutral-400", "mb-1")}>{title}</div>
    {children}
  </div>
}

export default Demo
