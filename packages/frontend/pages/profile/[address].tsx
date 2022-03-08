import Head from 'next/head'
import Layout from "../../components/Layouts/layout";
import {GetServerSideProps, GetStaticProps} from "next";

export default function Address() {
  return <>
    <Head>
      <title>zzNFT Profile Page</title>
    </Head>
    <div>
      Profile here
    </div>
  </>
}

// export const getStaticProps: GetStaticProps = async () => {
//   /*
//   * this page has some data dependencies - when you pre-render this page at build time, make
//   * sure to resolve them first
//   *
//   * in development mode, this will run on every request instead of *just* at build time
//   */
//
//   const data = "test"
//
//   // value of `props` key will be passed to your `FirstPost` component
//   return {
//     props: {
//       thing: data
//     }
//   }
// }


export const getServerSideProps: GetServerSideProps = async (context) => {
  //

  return  {
    props: {
      thing: "test"
    }
  }
}
