import React from "react";
import Head from 'next/head'
import classNames from "classnames";
import Link from "next/link";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import {css} from "../../helpers/css";

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
      <Header/>
      <div className={classNames("flex-grow")}>
        {children}
      </div>
    </main>
  </div>
}

const Header = () => {
  return <div className={classNames("flex", "justify-between")}>
    <Link href={"/"}>
      <a className={css("hover:underline")}>zzNFT</a>
    </Link>
    <ConnectWallet/>
  </div>
}

export default Layout
