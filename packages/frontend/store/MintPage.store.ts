import {computed, makeObservable, observable} from "mobx";
import {FileRejection} from "react-dropzone";
import {errorToast} from "../components/Toast/toast";
import NavigationStore from "./Navigation.store";

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
}

export default MintPageStore
