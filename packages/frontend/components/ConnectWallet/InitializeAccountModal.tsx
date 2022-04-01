import {observer} from "mobx-react";
import Modal from "../Modal/Modal";
import {appStore} from "../../store/App.store";
import {css} from "../../helpers/css";
import Button, {ButtonSize} from "../Button/Button";
import Link from "../Link/Link";

const InitializeAccountModal = observer(() => {
  return <Modal
    open={appStore.modals.isInitializeAccountModalVisible}
    onChange={(isOpen) => appStore.modals.isInitializeAccountModalVisible = isOpen}
    title={"Initialize zkSync Account"}>
    <div className={css("text-left", "text-center", "text-lg", "mt-6")}>
      <div>
        Initialize your zkSync account by depositing assets onto the network.
      </div>
      <div className={css("mt-10", "flex", "justify-center")}>
        <Link href={"https://trade.zigzag.exchange/bridge"} isExternal>
          Go to bridge
        </Link>
      </div>
    </div>
  </Modal>
})

export default InitializeAccountModal