import Head from 'next/head'
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {useEnsAvatar, useEnsLookup, useEnsResolver} from "wagmi";
import {css} from "../../helpers/css";
import Image from "next/image"
import {abbreviate, jsonfiy} from "../../helpers/strings";
import * as zksync from "zksync"
import {ethers} from "ethers";
import {NFT} from "zksync/build/types";
import NFTPreview from "../../components/NFTPreview/NFTPreview";
import {useState} from "react";

interface AddressProps {
  verifiedNFTs: NFT[];
  committedNFTs: NFT[];
}

enum Tabs {
  Collection = "Collection",
  Creation = "Creations"
}

export default function Address({verifiedNFTs, committedNFTs}: AddressProps) {
  const router = useRouter()
  const {address} = router.query
  const [{data: ens}] = useEnsLookup({address: address as string})
  const [{data: avatar}] = useEnsAvatar({addressOrName: ens})
  const displayName = ens ? ens : abbreviate(address as string)
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
        {(Object.keys(Tabs) as Array<keyof typeof Tabs>).map((key, index) => <div
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
      {tab === Tabs.Collection && verifiedNFTs.map(nft => <NFTPreview nft={nft}/>)}
      {tab === Tabs.Creation && <div>creations here</div>}
    </div>
  </>
}

export const getServerSideProps: GetServerSideProps<AddressProps> = async (context) => {
  const {address} = context.query
  let committedNFTs: NFT[] = []
  let verifiedNFTs: NFT[] = []

  try {
    if (address) {
      try {
        const validAddress = ethers.utils.getAddress(address as string)
        const syncProvider = await zksync.getDefaultProvider('rinkeby');
        const state = await syncProvider.getState(validAddress)
        committedNFTs = Object.keys(state.committed.nfts).map((key) => state.committed.nfts[Number(key)])
        verifiedNFTs = Object.keys(state.verified.nfts).map((key) => state.verified.nfts[Number(key)])
      } catch (e) {

      }
    }
  } catch (e) {
    console.error("debug:: error hit", e)
  }

  return {
    props: {
      committedNFTs,
      verifiedNFTs
    }
  }
}
