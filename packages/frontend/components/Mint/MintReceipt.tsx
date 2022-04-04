import {observer} from "mobx-react";
import MediaInput from "./MediaInput";
import MintPageStore from "../../store/MintPage.store";
import {css} from "../../helpers/css";
import Link from "../Link/Link";
import {DevToggle} from "../../environment/Dev";
import {jsonify} from "../../helpers/strings";
import {AppStore} from "../../store/AppStore";

const MintReceipt = observer(({store}: {store: MintPageStore}) => {
  return <div>
    <div className={css("text-3xl", "text-center", "mb-10")}>
      NFT Minted
    </div>
    <div className={css("flex", "justify-center")}>
      <div>
        <MediaInput store={store}/>
        <div className={css("mt-2")}>
          <div>{store.title}</div>
          <div className={css("text-sm", "text-neutral-400")}>
            {store.description}
          </div>
        </div>
      </div>
    </div>
    <div className={css("flex", "justify-center", "items-center", "flex-col", "mt-7")}>
      {store.zkSyncTxLink && <Link isExternal href={store.zkSyncTxLink}>view tx</Link>}
      <div className={css("mt-2")}>
        <Link href={`/profile/${AppStore.auth.account!.address}`}>
          view your profile
        </Link>
      </div>
    </div>
    <DevToggle>
      {jsonify(store.receipt)}
    </DevToggle>
  </div>
})

export default MintReceipt
