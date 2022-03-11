import Head from 'next/head'
import Layout, {siteTitle} from "../components/Layouts/layout";
import utilStyles from "../styles/utils.module.css"
import {useState} from "react";
import {useStore} from "../store/App.store";
import {utils} from "ethers";
import {observer} from "mobx-react";

const Home = observer(() => {
  const store = useStore()
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div>home content here</div>
        <div>{store.zk.ethBalance && utils.formatEther(store.zk.ethBalance)}</div>
      </section>
    </>
  )
})

export default Home
