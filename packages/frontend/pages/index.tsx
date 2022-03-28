import Head from 'next/head'
import {observer} from "mobx-react";
import TextField from "../components/TextField/TextField";
import {useState} from "react";
import {css} from "../helpers/css";
import {GetServerSideProps} from "next";
import {nfts, PrismaClient} from "@prisma/client";
import NFTPreview from "../components/NFTPreview/NFTPreview";
import {siteTitle} from "../constants";

interface HomeProps {
  feed: nfts[]
}

const Home = observer(({feed}: HomeProps) => {
  const [inputValue, setInputValue] = useState<string | undefined>()
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <div className={css("flex", "justify-center")}>
          <div className={css("w-full")} style={{maxWidth: "500px"}}>
            <TextField block placeholder={"Search..."} value={inputValue} onChange={(value) => setInputValue(value)}/>
            <div className={css("mt-8", "flex", "flex-col", "gap-8")}>
              {feed.map(nft => <NFTPreview key={nft.id} nft={nft} showDetails/>)}
            </div>
          </div>
        </div>
      </section>
    </>
  )
})

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  let feed: nfts[] = []

  try {
    const prisma = new PrismaClient()
    feed = await prisma.nfts.findMany()
  } catch (e) {
    console.error(e)
  }

  return {
    props: {feed}
  }
}

export default Home
