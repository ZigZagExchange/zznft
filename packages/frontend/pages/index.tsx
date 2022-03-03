import Head from 'next/head'
import Layout, {siteTitle} from "../components/Layouts/layout";
import utilStyles from "../styles/utils.module.css"

function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className={"text-3xl font-bold underline"}>check this out</div>
        <p>blah blah blah</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}
export default Home
