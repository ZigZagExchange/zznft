import Head from 'next/head'
import Layout, {siteTitle} from "../components/Layouts/layout";
import utilStyles from "../styles/utils.module.css"
import {useState} from "react";

export default function Home() {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div>home content here</div>
      </section>
    </>
  )
}
