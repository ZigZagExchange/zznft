import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'wagmi'
import connectors from "../config/connectors";
import Layout from "../components/Layouts/layout";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Error from "../components/Error/Error";

function MyApp({ Component, pageProps }: AppProps) {
  const isError = pageProps.error
  return (
    <Provider autoConnect connectors={connectors}>
      <Layout>
        {isError
          ? <Error statusCode={pageProps.error.statusCode}>{pageProps.error?.message}</Error>
          : <Component {...pageProps}/>}
      </Layout>
      <ToastContainer position={"bottom-right"} autoClose={4000}/>
    </Provider>
  )
}

export default MyApp
