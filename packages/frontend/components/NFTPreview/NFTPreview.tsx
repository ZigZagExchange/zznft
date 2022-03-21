import {NFT} from "zksync/build/types";
import {jsonfiy} from "../../helpers/strings";
import {useEffect} from "react";
import {css} from "../../helpers/css";
import {useRouter} from "next/router";


interface NFTPreviewProps {
  nft: NFT
}

const NFTPreview = ({nft}: NFTPreviewProps) => {
  const cid = nft.contentHash
  const baseIPFSGatewayURL = 'https://ipfs.io/ipfs'
  const router = useRouter()

  // const exampleCID = "bafkreibpfvcexzn7ixe72urxh3u6tpdvynnygh2ntr7pams2sf5plkr3ia"
  // useEffect(() => {
  //   fetch(`${baseIPFSGatewayURL}/${cid}`)
  //     .then(res => {
  //       console.log("debug:: res", res.body)
  //       return res
  //     })
  //     .then(json => {
  //       // console.log(json)
  //     })
  //     .catch(e => {
  //       console.error(e)
  //     })
  // }, [])

  return <div
    onClick={() => router.push(`/nft/${nft.id}`)}
    className={css("break-all", "bg-neutral-800", "p-3", "text-sm", "hover:cursor-pointer", "hover:bg-neutral-900")} style={{width: "300px", height: "300px"}}>
    {jsonfiy(nft)}
  </div>
}

export default NFTPreview
