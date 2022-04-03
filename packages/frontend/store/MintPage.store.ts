import {computed, makeObservable, observable} from "mobx";
import {FileRejection} from "react-dropzone";
import {errorToast} from "../components/Toast/toast";
import NavigationStore from "./Navigation.store";
import {AppStore} from "./AppStore";
import {Http} from "../services";
import App from "next/app";

interface MintFile extends File {
  preview: string
}

export enum MintView {
  Select = "select",
  Edit = "edit",
  Preview = "preview"
}

class MintPageStore extends NavigationStore<MintView>{

  @observable
  file: MintFile | null = null

  @observable
  title = ""

  @observable
  description = ""

  acceptedFileTypes = [
    {mime: "image/jpeg", extension: ".jpeg"},
    {mime: "image/png", extension: ".png"}
  ]

  constructor() {
    super(MintView.Select)
    makeObservable(this)
  }

  onDropAccepted(files: File[]) {
    if (files.length > 1) {
      throw Error("Only 1 file is allowed")
    }

    this.file = Object.assign(files[0], {
      preview: URL.createObjectURL(files[0])
    })
    this.title = this.file?.name
    this.description = "New NFT"
    this.currentView = MintView.Edit
  }

  onFileRejected(fileRejections: FileRejection[]) {
    fileRejections.forEach(file => {
      file.errors.forEach(error => {
        errorToast(error.message)
      })
    })
  }

  fileValidator(file: File) {
    console.log("debug:: file", file)
    console.log("debug:: type", file.type)
    return null
  }

  @computed
  get hasFile() {
    return !!this.file
  }

  get acceptedMimeTypeString() {
    return this.acceptedFileTypes.map(item => item.mime).join(",")
  }

  get acceptedExtensionString() {
    return this.acceptedFileTypes.map(item => item.extension).join(", ")
  }

  async submit() {
    // Build metadata
    const formData = new FormData()
    const message = "uploadMetadata"
    const signature = await AppStore.auth.wallet!.ethSigner.signMessage(message)
    formData.append("asset", this.file!)
    formData.append("name", this.title)
    formData.append("description", this.description)
    formData.append("attributes", "[]")
    formData.append("signature", signature)
    const {data} = await Http.post("/nft/metadata", formData)
    const {contentHash} = data

    console.log("debug:: contentHash", contentHash)

    // Sign tx & send to server
    const recipient = await AppStore.auth.wallet!.address()
    const tx = await AppStore.auth.getSignedMintTransaction({
      recipient,
      feeToken: "ETH",
      contentHash,
    })
    const res = await Http.post("/nft", {tx})
    console.log("tx sent to network", res)



    // // fetch({method: "POST", url: "/metadata"}).then(res => postNFTtoAPI)
    // const cid = "QmWxW6vwDZkgMJzTFZqTeTt5ggLJT4BXhTLXQpzMDJ7Zrk"
    // const contentHash = getContentHashFromCID(cid)
    // // const recipient = await this.appStore.zk.wallet!.address()
    //
    // const recipient = await appStore.auth.wallet!.address()
    // const tx = await appStore.auth.getSignedMintTransaction({
    //   recipient,
    //   feeToken: "ETH",
    //   contentHash,
    // })
    //
    // const newProvider = await zksync.getDefaultProvider("rinkeby")
    // const submittedTx = await submitSignedTransaction(tx!, newProvider, false)
    // console.log("submitted TX", submittedTx)
    // return submittedTx
  }
}

export default MintPageStore
