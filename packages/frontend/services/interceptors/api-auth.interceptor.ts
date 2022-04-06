import {AxiosRequestConfig} from "axios";
import {AppStore} from "../../store/AppStore";

const ApiAuthInterceptor = async (config: AxiosRequestConfig) => {
  const { method, data } = config

  console.log("axios config::", config)

  if (method === "post") {
    if (!AppStore.auth.wallet) {
      throw Error("No wallet found to sign auth headers")
    } else {
      const timestampSeconds = new Date().getTime() / 1000

      if (data instanceof FormData) {
        console.log("formdata hit")
      }

      const message = JSON.stringify(data) + "_" + timestampSeconds
      const signature = await AppStore.auth.wallet.ethSigner.signMessage(message)
      const address = AppStore.auth.wallet.address()
      config.headers!["X-Timestamp"] = timestampSeconds
      config.headers!["X-Signature"] = signature
      config.headers!["X-Address"] = address
    }
  }
  return config
}

export default ApiAuthInterceptor
