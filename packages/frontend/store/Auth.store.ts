import {makeObservable, observable} from "mobx";
import {Http} from "../services";
import {Account} from "../interfaces";
import ZKWalletStore from "./ZKWallet.store";
import {ethers} from "ethers";

class AuthStore extends ZKWalletStore {

  @observable
  account?: Account

  constructor() {
    super()
    makeObservable(this)
  }

  private async getAccount() {
    const address = await this.wallet?.address()
    return Http.get("/account", {params: {address: address}}).then(res => {
      const accounts: Account[] = res.data
      return accounts.find(account => account.address === address)
    })
  }

  private async signUp() {
    return await Http.post("/account", {
      address: await this.wallet?.address(),
      displayName: await this.wallet?.address()
    }).then(res => {
      // TODO set user here if it returned
      console.log("signup response", res)
      this.getAccount().then(account => this.account = account)
    })
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
  }

  get isAuthed() {
    return this.account && this.wallet
  }

}

export default AuthStore