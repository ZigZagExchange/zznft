import {computed, makeObservable, observable} from "mobx";
import {FileRejection} from "react-dropzone";
import {errorToast} from "../components/Toast/toast";
import NavigationStore from "./Navigation.store";
import {AppStore} from "./AppStore";
import {Http} from "../services";
import {Transaction} from "zksync";

interface MintFile extends File {
  preview: string
}

export enum MintView {
  Select = "select",
  Edit = "edit",
  Submit = "preview",
  Receipt = "receipt"
}

class MintPageStore extends NavigationStore<MintView>{

  @observable
  file: MintFile | null = null

  @observable
  title = ""

  @observable
  description = ""

  @observable
  receipt?: Transaction

  @observable
  isMetadataUploadLoading = false

  @observable
  isNftUploadLoading = false

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

  // TODO: any additional validator here?
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
    try {
      // Build metadata
      const formData = new FormData()
      formData.append("asset", this.file!)
      formData.append("name", this.title)
      formData.append("description", this.description)
      formData.append("attributes", "[]")

      this.isMetadataUploadLoading = true

      const metadataHeaders = await AppStore.auth.getApiSignatureHeaders({
        name: formData.get("name"),
        description: formData.get("description"),
        attributes: formData.get("attributes")
      })
      const {data} = await Http.post("/nft/metadata", formData, {headers: metadataHeaders})
      const {contentHash} = data

      this.isMetadataUploadLoading = false

      this.isNftUploadLoading = true
      const recipient = await AppStore.auth.wallet!.address()
      const tx = await AppStore.auth.getSignedMintTransaction({
        recipient,
        feeToken: "ETH",
        contentHash,
      })
      const mintHeaders = await AppStore.auth.getApiSignatureHeaders(tx)
      const { data: { receipt } } = await Http.post("/nft", {tx}, {headers: mintHeaders})
      this.receipt = receipt

      this.isNftUploadLoading = false

      this.currentView = MintView.Receipt
    } finally {
      this.isMetadataUploadLoading = false
      this.isNftUploadLoading = false
    }
  }

  @computed
  get zkSyncTxLink() {
    const hash = this.receipt?.txHash.split("sync-tx:")[1]
    if (!hash) {
      return hash
    } else {
      return `${process.env.NEXT_PUBLIC_BASE_ZK_EXPLORER_URL}/transactions/${hash}`
    }
  }

  @computed
  get isLoading() {
    return this.isNftUploadLoading || this.isMetadataUploadLoading
  }
}

export default MintPageStore
