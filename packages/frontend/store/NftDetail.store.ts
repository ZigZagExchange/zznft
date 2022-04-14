import {computed, makeObservable, observable} from "mobx";
import {Attributes, NFT} from "../interfaces";
import {Http} from "../services";
import {AppStore} from "./AppStore";
import * as zksync from "zksync"
import {debugToast} from "../components/Toast/toast";
import {jsonify} from "../helpers/strings";

class NftDetailStore {
  @observable
  nft: NFT

  @observable
  listAmount = ""

  @observable
  listCurrency = "ETH"

  constructor(nft: NFT) {
    makeObservable(this)
    this.nft = nft
  }

  @computed
  get metadata() {
    return JSON.parse(this.nft.metadata)
  }

  @computed
  get attributes() {
    let attributes: Attributes[] | undefined
    if (this.metadata.attributes) {
      if (typeof this.metadata.attributes === "string") {
        attributes = JSON.parse(this.metadata.attributes)
      } else if (Array.isArray(this.metadata.attributes)) {
        attributes = this.metadata.attributes
      }
    }
    return attributes
  }

  @computed
  get isAttributesValid() {
    return Array.isArray(this.attributes) && this.attributes.length > 0
  }

  // TODO: these change based on network
  @computed
  get currencySelectItems() {
    return [{name: "ETH", id: "ETH"}, {name: "USDC", id: "USDC"}]
  }

  async onListSubmit() {
    const order = await AppStore.auth.wallet?.getOrder({
      tokenSell: this.nft.tokenId,
      tokenBuy: this.listCurrency,
      amount: 1,
      ratio: zksync.utils.tokenRatio({
        [this.nft.tokenId]: 1,
        [this.listCurrency]: this.listAmount
      })
    })
    const { data } = await Http.post("/order", {order})
    console.log(data)
    debugToast(`Order submitted ${jsonify(order)}`)
  }
}

export default NftDetailStore
