import {NFT} from "zksync/build/types";
import {jsonfiy} from "../../helpers/strings";
import {useEffect} from "react";


interface NFTPreviewProps {
  nft: NFT
}

const NFTPreview = ({nft}: NFTPreviewProps) => {
  const cid = nft.contentHash
  const baseIPFSGatewayURL = 'https://ipfs.io/ipfs'

  useEffect(() => {
    fetch(`${baseIPFSGatewayURL}/${cid}`)
      .then(res => {
        console.log("debug:: res", res.body)
        return res
      })
      .then(json => {
        // console.log(json)
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return <div>
    {jsonfiy(nft)}
  </div>
}

export default NFTPreview
