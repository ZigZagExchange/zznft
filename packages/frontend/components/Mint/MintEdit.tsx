import {observer} from "mobx-react";
import MintPageStore, {MintView} from "../../store/MintPage.store";
import {css} from "../../helpers/css";
import MediaInput from "./MediaInput";
import Button, {ButtonType} from "../Button/Button";
import TextField from "../TextField/TextField";

const MintEdit = observer(({store}: { store: MintPageStore }) => {
  return <div className={css("grid", "grid-cols-2", "gap-16")}>
    <div>
      <MediaInput store={store}/>
      <div className={css("mt-2")}>
        <div>{store.title === "" ? "Your title here" : store.title}</div>
        <div className={css("text-sm", "text-neutral-400")}>
          {store.description === "" ? "Your description here" : store.description}
        </div>
      </div>
      <div className={css("flex", "justify-between", "mt-8")}>
        <Button variant={ButtonType.Black} onClick={() => store.goBack()}>back</Button>
        <Button onClick={() => store.currentView = MintView.Preview}>continue</Button>
      </div>
    </div>
    <div className={css("flex", "flex-col", "gap-5")}>
      <div>
        <div>Title</div>
        <TextField value={store.title} onChange={(value) => store.title = value}/>
      </div>

      <div>
        <div>Description</div>
        <TextField value={store.description} onChange={(value) => store.description = value}/>
      </div>
    </div>
  </div>
})

export default MintEdit
