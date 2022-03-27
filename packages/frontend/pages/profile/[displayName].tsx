import Head from 'next/head'
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {useEnsAvatar, useEnsLookup} from "wagmi";
import {css} from "../../helpers/css";
import {abbreviate, isValidEthereumAddress} from "../../helpers/strings";
import NFTPreview from "../../components/NFTPreview/NFTPreview";
import {useState} from "react";
import {objectKeys} from "../../helpers/arrays";
import {nfts, PrismaClient} from "@prisma/client";
import {accounts} from "@prisma/client/";

interface AddressProps {
  nftsOwned: nfts[]
  nftsMinted: nfts[]
  account: accounts
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
  // TODO: how can address here be string[]?
  return {props: getNftsFromDB(displayName as string)}
}

const getNftsFromDB = async (address: string) => {
  const prisma = new PrismaClient()
  let nftsMinted: nfts[] = []
  let nftsOwned: nfts[] = []
  let account: accounts | null

  if (isValidEthereumAddress(address)) {
    account = await prisma.accounts.findFirst({where: {address: address}})
  } else {
    account = await prisma.accounts.findFirst({where: {display_name: address}})
  }

  if (!account) {
    throw Error("Could not find account")
  }

  nftsMinted = await prisma.nfts.findMany({where: {creator_id: account.id}})
  nftsOwned = await prisma.nfts.findMany({where: {owner_id: account.id}})
  return {nftsMinted, nftsOwned, account}
}
