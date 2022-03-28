import {action, computed, makeObservable, observable} from "mobx";
import {Provider, Wallet} from "zksync";
import {BigNumber, BigNumberish, ethers} from "ethers";
import {Address, Network, Nonce, TokenLike} from "zksync/build/types";
import * as zksync from "zksync"
import {CID} from "multiformats";
import {base16} from "multiformats/bases/base16";


class ZKWalletStore {

  private syncProvider: Provider | null = null

  @observable
  private _zkWallet: Wallet | null = null

  @observable
  ethBalance: BigNumber | null = null

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
    console.log("attempting to connect to zkwallet")
    this.isWalletConnecting = true

    try {
      console.log("debug:: attempting to connect with", await signer.getChainId())
      // const signerNetwork = await signer.provider!.getNetwork()
      this.syncProvider = await zksync.getDefaultProvider("rinkeby")
      this.wallet = await zksync.Wallet.fromEthSigner(signer, this.syncProvider)
    } catch (e) {
      throw Error("Could not connect to zksync wallet")
    } finally {
      this.isWalletConnecting = false
    }
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

    return this.wallet!.signMintNFT(mintNFT as any);
  }

  @computed
  get isConnected() {
    return this.wallet!!
  }
}

export default ZKWalletStore
