import Head from 'next/head'
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {useEnsAvatar, useEnsLookup} from "wagmi";
import {css} from "../../helpers/css";
import NFTPreview from "../../components/NFTPreview/NFTPreview";
import {useState} from "react";
import {objectKeys} from "../../helpers/arrays";
import {Account, NFT} from "../../interfaces";
import useDisplayName from "../../hooks/useDisplayName";
import {ethers} from "ethers";
import * as zksync from "zksync"
import {NFT as zkNFT} from "zksync/build/types";
import {vars} from "../../environment/vars";
import nftMetadata from "../../mocks/nftMetadata";

interface AddressProps {
  nftsOwned: NFT[]
  nftsMinted: NFT[]
  account: Account | null
}

enum Tabs {
  Collection = "Collection",
  Creation = "Creations"
}

export default function DisplayName({nftsOwned, nftsMinted, account}: AddressProps) {
  const router = useRouter()
  const {address} = router.query
  const [{data: ens}] = useEnsLookup({address: address as string})
  const [{data: avatar}] = useEnsAvatar({addressOrName: ens})
  const {displayName} = useDisplayName(account?.address)
  const [tab, setTab] = useState<Tabs>(Tabs.Collection)

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
    <div>
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
    <div className={css("mt-8")}>
      <div className={css("flex", "gap-9")}>
        {tab === Tabs.Collection && nftsOwned.map(nft => <NFTPreview key={nft.id} nft={nft}/>)}
        {tab === Tabs.Creation && nftsMinted.map(nft => <NFTPreview key={nft.id} nft={nft}/>)}
      </div>
    </div>
  </>
}

export const getServerSideProps: GetServerSideProps<AddressProps> = async (context) => {
  const {displayName} = context.query
  if (!displayName) {
    throw Error("No address")
  }

  let account = null
  let nftsMinted: any[] = []
  let nftsOwned: any[] = []
  // TODO: I need query param here for specific account
  // account = await Http.get<Account>("/account")
  // nftsMinted = await Http.get<Account>("/nft/minted")
  // nftsOwned = await Http.get<Account>("/nft/owned")
  return {props: {...await getNftsFromChain(displayName as string), account}}
}

// TODO: waiting on API
const getNftsFromChain = async (address: string) => {
  let nftsOwned: NFT[] = []
  let nftsMinted: NFT[] = []

  let committedNFTs: zkNFT[] = []
  let committedMintedNFTs: zkNFT[] = []

  try {
    try {
      const validAddress = ethers.utils.getAddress(address as string)
      const syncProvider = await zksync.getDefaultProvider(vars.TARGET_NETWORK_NAME);
      const state = await syncProvider.getState(validAddress)
      committedNFTs = objectKeys(state.committed.nfts).map((key) => state.committed.nfts[key])
      committedMintedNFTs = objectKeys(state.committed.mintedNfts).map(key => state.committed.mintedNfts[key])

      nftsOwned = committedNFTs.map(nft => ({
        address,
        token_id: nft.id.toString(),
        metadata: nftMetadata,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        id: "asdlfkj",
        ownerId: "asldkfj",
        minterId: "asdlfkj"
      }))
      nftsMinted = committedMintedNFTs.map(nft => ({
        address,
        token_id: nft.id.toString(),
        metadata: nftMetadata,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        id: "asdlfkj",
        ownerId: "asldkfj",
        minterId: "asdlfkj"
      }))

    } catch (e) {

    }
  } catch (e) {
    console.error("debug:: error hit", e)
  }

  return {
    nftsOwned,
    nftsMinted
  }
}