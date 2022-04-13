import {computed, makeObservable, observable} from "mobx";
import {Attributes, NFT} from "../interfaces";

class NftDetailStore {
  @observable
  nft: NFT

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
}

export default NftDetailStore
