/*
  ipfs://QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb
  ar://jK9sR4OrYvODj7PD3czIAyNJalub0-vdV_JAg1NqQ-o

{
  "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
  "external_url": "https://openseacreatures.io/3",
  "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
  "name": "Dave Starbelly",
  "background_color": "746345", // Hex without pre-pended #,
  "animation_url": "...",
  "youtube_url": "...",
  "attributes": [
    {"trait_type": "Trait", "value": "Value Here"},
    ...
  ],
}
*/

import {Metadata} from "../pages/nft/[id]";

const nftMetadata: Metadata = {
  description: "They say a picture is worth a thousand words. Instead I am asking for\n" +
    "a thousand DAI. Sometimes money feels better than words.",
  external_url: "https://twitter.com",
  image: "https://bafkreibpfvcexzn7ixe72urxh3u6tpdvynnygh2ntr7pams2sf5plkr3ia.ipfs.nftstorage.link/",
  name: "A Picture Frame",
  attributes: [
    {trait_type: "Color", value: "Green"}
  ]
}

export default nftMetadata
