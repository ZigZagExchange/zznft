import {css} from "../../helpers/css";
import {useRouter} from "next/router";
import {Metadata, NFT} from "../../interfaces";
import {DevToggle} from "../../environment/Dev";
import {jsonify} from "../../helpers/strings";

interface NFTPreviewProps {
  nft: NFT;
  showDetails?: boolean;
  square?: boolean
}

const NFTPreview = ({nft, showDetails = false, square}: NFTPreviewProps) => {
  const router = useRouter()
  const metadata = JSON.parse(nft.metadata) as Metadata
  return <div>
    <div
      style={square ? {height: "300px", width: "300px"} : {}}
      onClick={() => router.push(`/nft/${nft.tokenId}`)}
      className={css("break-all", "p-3", "text-sm", "hover:cursor-pointer", "hover:bg-neutral-900", "w-full", "h-full", "flex", "items-center", "justify-center", "overflow-hidden")}>
      <img src={metadata.image} style={{minHeight: "200px"}}/>
    </div>
    {showDetails && <div className={css("flex", "justify-between", "mt-3", "text-neutral-400")}>
      <div>{metadata.name}</div>
      <div>{nft.tokenId}</div>
    </div>}
  </div>
}

export default NFTPreview
