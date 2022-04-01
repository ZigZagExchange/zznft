import {action, makeObservable, observable} from "mobx";

class ModalsStore {
  @observable
  isInitializeAccountModalVisible = false

  @observable
  isConnectWalletModalVisbile = false

  constructor() {
    makeObservable(this)
  }

  @action
  hideAll() {
    this.isConnectWalletModalVisbile = false
    this.isConnectWalletModalVisbile = false
  }

}

export default ModalsStore
