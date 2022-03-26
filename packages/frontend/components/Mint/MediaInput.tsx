import MintPageStore from "../../store/MintPage.store";
import {observer} from "mobx-react";
import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {css} from "../../helpers/css";

interface MediaInputProps {
  isInput?: boolean;
  store: MintPageStore
}

const MediaInput = observer(({isInput = false, store}: MediaInputProps) => {
  const onDropRejected = useCallback(rejections => store.onFileRejected(rejections), [])
  const onDropAccepted = useCallback((files) => store.onDropAccepted(files), [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDropAccepted,
    onDropRejected,
    disabled: !isInput,
    validator: store.fileValidator.bind(store),
    accept: store.acceptedMimeTypeString,
    maxFiles: 1
  })

  return <div
    {...getRootProps()}
    style={{width: "400px", height: "400px"}}
    className={css("border-2", "border-dashed", "border-neutral-600", "flex", "relative", "justify-center", "items-center", "overflow-hidden", "cursor-default", {
      "hover:cursor-pointer": isInput,
      "hover:cursor-default": !isInput
    })}>
    {store.hasFile && <img src={store.file?.preview}/>}
    {!store.hasFile && <>
      {isDragActive ? <div>What a beauty</div> : <div>Drop your 🖼 here</div>}
    </>}
    {isInput && <input {...getInputProps()}/>}
  </div>
})

export default MediaInput
