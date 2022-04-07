import {css} from "../../helpers/css";
import {useRouter} from "next/router";
import {Metadata, NFT} from "../../interfaces";
import {DevToggle} from "../../environment/Dev";
import {jsonify} from "../../helpers/strings";

interface NFTPreviewProps {
  nft: NFT;
  showDetails?: boolean;
}

const NFTPreview = ({nft, showDetails = false}: NFTPreviewProps) => {
  const router = useRouter()
  const metadata = JSON.parse(nft.metadata) as Metadata
  return <div>
    <div
      style={{height: "300px", width: "300px"}}
      onClick={() => router.push(`/nft/${nft.tokenId}`)}
      className={css("break-all", "bg-neutral-800", "p-3", "text-sm", "hover:cursor-pointer", "hover:bg-neutral-900", "w-full", "h-full", "flex", "items-center", "justify-center", "overflow-hidden")}>
      <img src={metadata.image}/>
    </div>
    {showDetails && <div className={css("flex", "justify-between", "mt-3")}>
      <div>{metadata.name}</div>
      <div>{nft.tokenId}</div>
    </div>}
  </div>
}

export default NFTPreview
