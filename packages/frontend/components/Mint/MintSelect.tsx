import {observer} from "mobx-react";
import MintPageStore, {MintView} from "../../store/MintPage.store";
import {css} from "../../helpers/css";
import MediaInput from "./MediaInput";
import Button from "../Button/Button";

const MintSelect = observer(({store}: { store: MintPageStore }) => {
  return <div>
    <div className={css("relative")}>
      <MediaInput store={store} isInput/>
      {store.currentView === MintView.Select && store.hasFile && <div className={css("absolute")} style={{top: 0, right: 0}}>
        <Button onClick={() => store.file = null}>x</Button>
      </div>}
    </div>
    {!store.hasFile && <div className={css("text-sm", "mt-2", "text-neutral-400")}>
      accepts: {store.acceptedExtensionString}
    </div>}
    {store.hasFile && <div className={css("mt-2")}>
      <div>{store.file?.name}</div>
      <div className={css("flex", "justify-end", "mt-5")}>
        <Button onClick={() => store.currentView = MintView.Edit}>continue</Button>
      </div>
    </div>}
  </div>
})

export default MintSelect
