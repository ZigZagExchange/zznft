import React from "react";
import styles from "./layout.module.css"
import utilStyles from "../../styles/utils.module.css"
import Head from 'next/head'
import Link from "next/link";
import Image from 'next/image'


interface LayoutProps {
  children: any;
  home: any;
}

const name = 'Caleb Carithers'
export const siteTitle = 'Next.js Sample Website'

const Layout = ({children, home}: LayoutProps) => {
  return <div className={styles.container}>
    <Head>
      <link rel={"icon"} href={"/favicon.ico"}/>
      <meta
        name={"description"}
        content={"Learn how to build a personal website using Next.js"}
      />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta
        name={"og:title"}
        content={siteTitle}
      />
      <meta
        name={"twitter:card"}
        content={"summary_large_image"}
      />
    </Head>
    <header className={styles.header}>
      {home ? (
        <>
          <Image
            priority
            src={"/images/profile.jpeg"}
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt={name}
          />
        </>
      )
      : <>
          <Link href={"/"}>
            <a>
              <Image
                priority
                src="/images/profile.jpeg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href={"/"}>
              <a className={utilStyles.colorInherit}>{name}</a>
            </Link>
          </h2>
        </>
      }
    </header>
    <main>{children}</main>
    {!home && <div className={styles.backToHome}>
      <Link href={"/"}><a>Back to home</a></Link>
    </div>}
    </div>
}

export default Layout
