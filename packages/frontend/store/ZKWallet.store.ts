import {action, computed, makeObservable, observable} from "mobx";
import {Provider, Wallet} from "zksync";
import {BigNumber, BigNumberish, ethers} from "ethers";
import {Address, Network, Nonce, TokenLike} from "zksync/build/types";
import * as zksync from "zksync"
import {CID} from "multiformats";
import {base16} from "multiformats/bases/base16";
import {debugToast, errorToast} from "../components/Toast/toast";


class ZKWalletStore {

  private syncProvider: Provider | null = null

  @observable
  wallet: Wallet | null = null

  @observable
  isWalletConnecting = false

  constructor() {
    makeObservable(this)
  }

  static getContentHashFromV0CID(cidv0: string) {
    const cidHash = CID.parse(cidv0)
    const cidString = cidHash.toV1().toString(base16.encoder)
    const cidLength = cidString.length
    return '0x' + cidString.slice(cidLength - 64, cidLength + 1)
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
    console.log("account id:", accountId)
    if (accountId === undefined || accountId === null) {
      // TODO: show some pretty modal linking to the zigzag bridge to deposit assets
      errorToast("Please deposit some assets to zkSync to initialize your account")
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
