import Head from 'next/head'
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {useEnsAvatar, useEnsLookup} from "wagmi";
import {css} from "../../helpers/css";
import NFTPreview from "../../components/NFTPreview/NFTPreview";
import {useState} from "react";
import {objectKeys} from "../../helpers/arrays";
import {Account, NFT} from "../../interfaces";
import {ethers} from "ethers";
import * as zksync from "zksync"
import {NFT as zkNFT} from "zksync/build/types";
import {vars} from "../../environment/vars";
import nftMetadata from "../../mocks/nftMetadata";
import {AppStore} from "../../store/AppStore";
import {observer} from "mobx-react";
import {Http} from "../../services";

interface AddressProps {
  nftsOwned: NFT[]
  nftsMinted: NFT[]
  account: Account | null
}

enum Tabs {
  Collection = "Collection",
  Creation = "Creations"
}

const Profile = observer(({nftsOwned, nftsMinted, account}: AddressProps) => {
  const router = useRouter()
  const {address} = router.query
  const [{data: ens}] = useEnsLookup({address: address as string})
  const [{data: avatar}] = useEnsAvatar({addressOrName: ens})
  const [tab, setTab] = useState<Tabs>(Tabs.Collection)

  return <>
    <Head>
      <title>{AppStore.auth.displayName} | zznft</title>
    </Head>
    <div className={css("flex", "justify-center")}>
      <div className={css("flex", "flex-col", "items-center")}>
        <div className={css("overflow-hidden", "rounded-full", "relative", "mt-5")}
             style={{width: "100px", height: "100px"}}>
          {avatar ? <img src={avatar} height={"35px"} alt={"profile"}/>
            : <div className={css("bg-neutral-800", "w-full", "h-full")}/>}
        </div>
        <div className={css("text-center", "mt-6", "text-2xl")}>
          {AppStore.auth.displayName}
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
      <div className={css("flex", "gap-10", "flex-wrap", "justify-center")}>
        {tab === Tabs.Collection && nftsOwned.map(nft => <NFTPreview showDetails key={nft.id} nft={nft}/>)}
        {tab === Tabs.Creation && nftsMinted.map(nft => <NFTPreview showDetails key={nft.id} nft={nft}/>)}
      </div>
    </div>
  </>
})

//@ts-ignore
export const getServerSideProps: GetServerSideProps<AddressProps> = async (context) => {
  const {displayName} = context.query
  if (!displayName) {
    throw Error("No address")
  }
  const { data: account } = await Http.get<Account>(`/account/${displayName}`)
  const { data: nftsMinted } = await Http.get<Account>(`/nft/owner/${displayName}`)
  const { data: nftsOwned } = await Http.get<Account>(`/nft/owner/${displayName}`)
  return {props: {account, nftsMinted, nftsOwned}}
}

export default Profile