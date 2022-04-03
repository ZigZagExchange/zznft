import {computed, makeObservable, observable} from "mobx";
import {Http} from "../services";
import {Account} from "../interfaces";
import ZKWalletStore from "./ZKWallet.store";
import {ethers} from "ethers";
import {abbreviate, isValidEthereumAddress} from "../helpers/strings";
import {errorToast} from "../components/Toast/toast";

class AuthStore extends ZKWalletStore {

  @observable
  account?: Account

  constructor() {
    super()
    makeObservable(this)
  }

  private async getAccount() {
    const address = await this.wallet?.address()
    return Http.get("/account", {params: {address}}).then(res => {
      const accounts: Account[] = res.data
      return accounts.find(account => account.address === address)
    })
  }

  private async signUp() {
    const address = this.wallet?.address()
    const message = `${address}:account`
    const signature = await this.wallet?.ethSigner.signMessage(message)
    return await Http.post("/account", {
      displayName: address,
      address,
      signature
    }).then(res => {
      const {data} = res
      this.account = data
    }).catch(e => {
      console.error(e)
      errorToast("Could not sign up with zznft")
    })
  }

  async connect(signer: ethers.Signer) {
    try {
      await super.connect(signer)
      try {
        this.account = await this.getAccount()
      } catch (e) {
        console.error(e)
        console.error("Could not get account")
        throw e
      }
      if (!this.account) {
        try {
          await this.signUp()
        } catch (e) {
          errorToast("Could not sign up")
          throw e
        }
      }
    } catch (e) {
      console.error(e)
      throw Error("Could not sign up")
    }
  }

  logout() {
    super.disconnect()
    this.account = undefined
  }

  get isAuthed() {
    return this.account && this.wallet
  }

  @computed
  get displayName() {
    if (this.isAuthed) {
      if (this.account!.displayName) {
        const displayName = this.account!.displayName
        return isValidEthereumAddress(displayName) ? abbreviate(displayName) : displayName
      } else {
        return abbreviate(this.account!.address)
      }
    } else {
      return ""
    }
  }

}

export default AuthStore