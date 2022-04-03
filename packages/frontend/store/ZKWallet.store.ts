import {action, computed, makeObservable, observable} from "mobx";
import {Provider, Wallet} from "zksync";
import {BigNumberish, ethers} from "ethers";
import {Address, Network, Nonce, TokenLike} from "zksync/build/types";
import * as zksync from "zksync"
import {debugToast, errorToast} from "../components/Toast/toast";
import {AppStore} from "./AppStore";
const contentHash = require("content-hash")

class ZKWalletStore {

  private syncProvider: Provider | null = null

  @observable
  wallet: Wallet | null = null

  @observable
  isWalletConnecting = false

  constructor() {
    makeObservable(this)
  }

  @action
  disconnect() {
    this.wallet = null
    this.isWalletConnecting = false
  }

  @action
  async connect(signer: ethers.Signer) {
    this.isWalletConnecting = true
    try {
      debugToast(`Connecting to zkSync on chain ID: ${await signer.getChainId()}`)
      const signerNetwork = await signer.provider!.getNetwork()
      this.syncProvider = await zksync.getDefaultProvider(signerNetwork.name as Network)
      this.wallet = await zksync.Wallet.fromEthSigner(signer, this.syncProvider)
      if (!await this.wallet.isSigningKeySet()) {
        await this.unlockAccount()
      }
    } finally {
      this.isWalletConnecting = false
    }
  }

  async unlockAccount() {
    const accountId = await this.wallet!.getAccountId()
    console.log("debug:: account id", accountId)
    if (accountId === undefined || accountId === null) {
      AppStore.modals.hideAll()
      AppStore.modals.isInitializeAccountModalVisible = true
      debugToast("Account does not exist on zkSync")
      throw new Error("zkSync account does not exist")
    }
    const tx = await this.wallet?.setSigningKey({
      feeToken: "ETH",
      ethAuthType: "ECDSA"
    })
    return await tx?.awaitReceipt()
  }

  async getSignedMintTransaction(mintNFT: {
    recipient: Address,
    contentHash: ethers.BytesLike,
    feeToken: TokenLike,
    fee?: BigNumberish,
    nonce?: Nonce,
  }) {
    mintNFT.nonce = mintNFT.nonce != null ? await this.wallet!.getNonce(mintNFT.nonce) : await this.wallet!.getNonce();
    mintNFT.contentHash = ethers.utils.hexlify(mintNFT.contentHash);

    if (mintNFT.fee == null) {
      const fullFee = await this.syncProvider!.getTransactionFee('MintNFT', mintNFT.recipient, mintNFT.feeToken);
      mintNFT.fee = fullFee!.totalFee;
    }

    return await this.wallet!.signMintNFT(mintNFT as any);
  }

  @computed
  get isWalletConnected() {
    return this.wallet!!
  }
}

export default ZKWalletStore
