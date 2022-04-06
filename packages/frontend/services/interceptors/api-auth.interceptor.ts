import {AxiosRequestConfig} from "axios";
import {AppStore} from "../../store/AppStore";
import {FILE_UPLOAD_KEY} from "../../constants";

const ApiAuthInterceptor = async (config: AxiosRequestConfig) => {
  const { method, data } = config

  if (method === "post") {
    if (!AppStore.auth.wallet) {
      throw Error("No wallet found to sign auth headers")
    } else {
      const timestamp = new Date().toISOString()
      let payload = data

      if (data instanceof FormData) {
        payload = {}
        for (var pair of data) {
          const key = pair[0]
          const val = pair[1]
          if (val instanceof File) {
            // TODO: require only single file to be attached
            // TODO: order with file key in payload here is possible issue
            if (key !== FILE_UPLOAD_KEY) {
              throw new Error("File must be attached with 'file' key")
            }
            payload[FILE_UPLOAD_KEY] = val.name
          } else {
            payload[key] = val
          }
        }
      }

      const message = JSON.stringify(payload) + "_" + timestamp

      console.log("debug:: payload", message)

      const signature = await AppStore.auth.wallet.ethSigner.signMessage(message)
      const address = AppStore.auth.wallet.address()
      config.headers!["X-Timestamp"] = timestamp
      config.headers!["X-Signature"] = signature
      config.headers!["X-Address"] = address
    }
  }

  // TODO: optional auth on GET requests?? or possibly two http clients. once using auth, and one not
  // else if (method === "get") {
  //
  // }

  return config
}

export default ApiAuthInterceptor
