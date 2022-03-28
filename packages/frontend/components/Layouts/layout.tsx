import React from "react";
import Head from 'next/head'
import classNames from "classnames";
import Link from "next/link";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import {css} from "../../helpers/css";
import {useAppStore} from "../../store/App.store";
import Button from "../Button/Button";
import {useRouter} from "next/router";
import {observer} from "mobx-react";
import {isDev} from "../../environment";
import {siteTitle} from "../../constants";
import {useNetwork} from "wagmi";
import { motion } from "framer-motion";

interface LayoutProps {
  children: any;
}

const Layout = ({children}: LayoutProps) => {
  return <div className={classNames("h-full", "p-3", "bg-black")}>
    <Head>
      <link rel={"icon"} href={"/favicon.ico"}/>
      <meta
        name={"description"}
        content={"NFT marketplace on zkSync V1"}
      />
      <meta
        name={"og:title"}
        content={siteTitle}
      />
      <title>zzNFT</title>
    </Head>
    <main className={classNames("h-full", "flex", "flex-col", "font-mono", "text-white", "text-lg", "overflow-x-hidden")}>
      <div className={css("mb-5")}>
        <Header/>
      </div>
      <div className={classNames("flex-grow")}>
        {children}
      </div>
    </main>
  </div>
}

const Header = observer(() => {
  const store = useAppStore()
  const router = useRouter()

  return <div>
    <EnvironmentBanner/>
    <div className={classNames("flex", "justify-between")}>
      <div>
        <Link href={"/"}>
          <a className={css("hover:underline")}>zzNFT</a>
        </Link>
        {isDev() && <Link href={"/dsl"}>
          <a className={css("hover:underline", "ml-10")}>dsl</a>
        </Link>}
      </div>
      <div className={css("flex")}>
        <div className={css("mr-4")}>
          {store.zk.isConnected && <Button onClick={() => router.push("/mint")}>+</Button>}
        </div>
        <ConnectWallet/>
      </div>
    </div>
  </div>
})

const EnvironmentBanner = () => {
  const [{data}] = useNetwork()
  const {chain} = data
  return <div className={css("whitespace-nowrap")}>
    <motion.div
        className={css("flex")}
        animate={{x: ["100%", "-100%"], padding: "3px 0px"}}
        transition={{x: {duration: 60, repeat: Infinity, ease: "linear", repeatType: "loop"}}}
    >
      {new Array(10).fill(undefined).map((item, index) => <div
          className={css("text-white", "flex", "ml-7")}
          key={`dev-banner-${index}`}>///// rinkeby /////</div>)}
    </motion.div>
  </div>
}

export default Layout
