import {observer} from "mobx-react";
import MintPageStore from "../../store/MintPage.store";
import {css} from "../../helpers/css";
import MediaInput from "./MediaInput";
import Button, {ButtonType} from "../Button/Button";
import {errorToast} from "../Toast/toast";
import Spinner, {SpinnerSize} from "../Spinner/Spinner";

const MintSubmit = observer(({store}: {store: MintPageStore}) => {
  return <div className={css("grid", "grid-cols-2", "gap-16")}>
    <div>
      <MediaInput store={store}/>
      <div className={css("mt-2")}>
        <div>{store.title}</div>
        <div className={css("text-sm", "text-neutral-400")}>
          {store.description}
        </div>
      </div>
    </div>
    <div style={{maxWidth: "500px"}}>
      <div className={css({"hidden": store.isLoading}, "flex", "flex-col", "justify-between", "h-full", "relative")}>
        <div>
          <div>You are about to release "{store.title}" to the world.</div>
          <div className={css("mt-5")}>Double check the details below as you will not be able to alter them after minting.</div>
        </div>

        <div className={css("flex", "justify-around")}>
          <Button disabled={store.isLoading} onClick={() => store.goBack()} type={ButtonType.Black}>back</Button>
          <Button disabled={store.isLoading}
                  onClick={() => {
                    store.submit().catch(e => {
                    console.error(e)
                    errorToast("Could not mint NFT")
                  })}}>
            mint
          </Button>
        </div>
      </div>

      {store.isLoading && <div className={css("flex", "flex-col", "items-center", "justify-center", "h-full")}>
        <div><Spinner size={SpinnerSize.lg}/></div>
        <div className={css("mt-4")}>
          <div
            className={css({"block": store.isNftUploadLoading, "hidden": !store.isNftUploadLoading})}>
            sign tx to upload nft
          </div>
          <div className={css({"block": store.isMetadataUploadLoading, "hidden": !store.isMetadataUploadLoading})}>
            sign txs (3) to upload metadata
          </div>
        </div>
      </div>}
    </div>
  </div>
})

export default MintSubmit
