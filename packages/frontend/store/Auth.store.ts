import {computed, makeObservable, observable} from "mobx";
import {Http} from "../services";
import {Account} from "../interfaces";
import ZKWalletStore from "./ZKWallet.store";
import {ethers} from "ethers";
import {abbreviate, isValidEthereumAddress} from "../helpers/strings";

class AuthStore extends ZKWalletStore {

  @observable
  account?: Account

  constructor() {
    super()
    makeObservable(this)
  }

  private async getAccount() {
    const address = await this.wallet?.address()
    const {data: account} = await Http.get(`/account/${address}`)
    return account
  }

  private async signUp() {
    const address = this.wallet?.address()
    const body = {
      displayName: address,
      address
    }
    try {
      const {data} = await Http.post("/account", body)
      this.account = data
    } catch (e) {
      console.error("Could not sign up with zznft")
      throw e
    }
  }

  async connect(signer: ethers.Signer) {
    try {
      await super.connect(signer)
      this.account = await this.getAccount()

      if (!this.account) {
        await this.signUp()
      }
    } catch (e) {
      console.error(e)
      throw Error("Could not sign up")
    }
  }

  logout() {
    super.disconnect()
    this.account = undefined
    this.wallet = null
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

  async getApiSignatureHeaders(body: object | FormData) {
    const now = new Date()
    const seconds = now.getTime() / 1000
    const message = JSON.stringify(body) + "_" + seconds
    const signature = await this.wallet?.ethSigner.signMessage(message)
    return {
      "X-Timestamp": seconds!,
      "X-Signature": signature!
    }
  }

}

export default AuthStore