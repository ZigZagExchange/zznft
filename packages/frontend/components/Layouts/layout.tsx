import React from "react";
import Head from 'next/head'
import classNames from "classnames";
import Link from "next/link";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import {css} from "../../helpers/css";
import {useStore} from "../../store/App.store";
import Button from "../Button/Button";
import {useRouter} from "next/router";
import {observer} from "mobx-react";
import {isDev} from "../../environment";

interface LayoutProps {
  children: any;
}

export const siteTitle = 'zzNFT'

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
  const store = useStore()
  const router = useRouter()

  return <div className={classNames("flex", "justify-between")}>
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
})

export default Layout
