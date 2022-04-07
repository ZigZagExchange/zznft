import Head from 'next/head'
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {useEnsAvatar, useEnsLookup} from "wagmi";
import {css} from "../../helpers/css";
import NFTPreview from "../../components/NFTPreview/NFTPreview";
import {useState} from "react";
import {objectKeys} from "../../helpers/arrays";
import {Account, NFT} from "../../interfaces";
import {observer} from "mobx-react";
import {Http} from "../../services";
import {abbreviate, isValidEthereumAddress} from "../../helpers/strings";
import {ethers} from "ethers";
import useDisplayName from "../../hooks/useDisplayName";

interface AddressProps {
  nftsOwned: NFT[]
  nftsMinted: NFT[]
  address: string
}

enum Tabs {
  Collection = "Collection",
  Creation = "Creations"
}

const Profile = observer(({nftsOwned, nftsMinted, address}: AddressProps) => {
  const [{data: ens}] = useEnsLookup({address: address as string})
  const [{data: avatar}] = useEnsAvatar({addressOrName: ens})
  const [tab, setTab] = useState<Tabs>(Tabs.Collection)
  const {displayName} = useDisplayName(address)
  return <>
    <Head>
      <title>{displayName} | zznft</title>
    </Head>
    <div className={css("flex", "justify-center")}>
      <div className={css("flex", "flex-col", "items-center")}>
        <div className={css("overflow-hidden", "rounded-full", "relative", "mt-5")}
             style={{width: "100px", height: "100px"}}>
          {avatar ? <img src={avatar} height={"35px"} alt={"profile"}/>
            : <div className={css("bg-neutral-800", "w-full", "h-full")}/>}
        </div>
        <div className={css("text-center", "mt-6", "text-2xl")}>
          {displayName}
        </div>
      </div>
    </div>
    <div className={css("flex", "flex-col")}>
      <div className={css("flex", "justify-center", "mt-16")}>
        {objectKeys(Tabs).map((key, index) => <div
          key={key}
          className={css("hover:underline", "hover:cursor-pointer", {
            "underline": Tabs[key] === tab,
            "mr-5": index === 0,
            "ml-5": index !== 0
          })}
          onClick={() => setTab(Tabs[key])}
        >
          {Tabs[key]}
        </div>)}
      </div>
    </div>
    <div className={css("mt-8", "flex-grow-1")}>
      <div className={css("flex", "gap-10", "flex-wrap", "justify-center", "mt-24")}>
        {tab === Tabs.Collection && <>
          {nftsOwned.length > 0 && nftsOwned.map(nft => <NFTPreview showDetails key={nft.id} nft={nft}/>)}
          {nftsOwned.length === 0 && <div className={css("text-neutral-400", "mt-32")}>no owned nfts found</div>}
        </>}
        {tab === Tabs.Creation && <>
          {nftsMinted.length > 0 && nftsMinted.map(nft => <NFTPreview showDetails key={nft.id} nft={nft}/>)}
          {nftsMinted.length === 0 && <div className={css("text-neutral-400", "mt-32")}>no minted nfts found</div>}
        </>}
      </div>
    </div>
  </>
})

//@ts-ignore
export const getServerSideProps: GetServerSideProps<AddressProps> = async (context) => {
  const {displayName: shouldBeAddress} = context.query
  let address
  if (shouldBeAddress && isValidEthereumAddress(shouldBeAddress as string)) {
    address = ethers.utils.getAddress(shouldBeAddress as string)
  } else {
    throw Error("No address")
  }

  const { data: nftsMinted } = await Http.get<NFT>('/nft', {params: {creatorAddress: address}})
  const { data: nftsOwned } = await Http.get<NFT>('/nft', {params: {ownerAddress: address}})
  return {props: {
      address,
      nftsMinted,
      nftsOwned
    }
  }
}

export default Profile