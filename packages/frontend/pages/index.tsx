import Head from 'next/head'
import {siteTitle} from "../components/Layouts/layout";
import {useStore} from "../store/App.store";
import {observer} from "mobx-react";
import TextField from "../components/TextField/TextField";
import {useState} from "react";
import {css} from "../helpers/css";
import {GetServerSideProps} from "next";

interface HomeProps {

}

const Home = observer(() => {
  const store = useStore()
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
          </div>
        </div>
      </section>
    </>
  )
})

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // TODO async requst to get inital home page from feed here
  return {
    props: {}
  }
}

export default Home
