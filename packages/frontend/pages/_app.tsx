import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'wagmi'
import connectors from "../services/wagmi";
import Layout from "../components/Layouts/layout";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider autoConnect connectors={connectors}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
