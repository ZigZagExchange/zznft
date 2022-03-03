import Head from 'next/head'
import Layout from "../../components/Layouts/layout";

function FirstPost() {
  return <Layout home={false}>
    <Head>
      <title>First Post</title>
    </Head>
    <div>
      Check out my awesome content!!
    </div>
  </Layout>
}

export default FirstPost
