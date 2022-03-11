import {action, makeObservable, observable} from "mobx";
import {Wallet} from "zksync";
import {BigNumber, ethers} from "ethers";
import {Network} from "zksync/build/types";
import * as zksync from "zksync"


class ZKWalletStore {

  @observable
  private _zkWallet: Wallet | null = null

  @observable
  ethBalance: BigNumber | null = null

  constructor() {
    makeObservable(this)
  }

  set wallet(wallet: Wallet | null) {
    this._zkWallet = wallet
    if (this.wallet) {
      this.walletInit()
    }
  }

  get wallet() {
    return this._zkWallet
  }

  @action
  async walletInit() {
    const balance = await this.wallet?.getBalance("ETH")
    this.ethBalance = balance ? balance : null
  }


  @action
  disconnect() {
    this.wallet = null
    this.ethBalance = null
  }

  @action
  async connect(signer: ethers.Signer) {
    console.log("debug:: attempting to connect with", await signer.getChainId())

    const signerNetwork = await signer.provider!.getNetwork()
    // TODO: check if these signer networks are always the same?
    const provider = await zksync.getDefaultProvider(signerNetwork.name as Network)
    this.wallet = await zksync.Wallet.fromEthSigner(signer, provider)
  }

}

export default ZKWalletStore
