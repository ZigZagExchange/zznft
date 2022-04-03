import {AxiosError} from "axios";
import {debugToast, errorToast} from "../../components/Toast/toast";


const ApiErrorInterceptor = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status
    if (status === 500) {
      errorToast("500 error")
    } else if (error.response.data && error.response.data.message) {
      debugToast("Error thrown with message")
    } else if (status === 400) {
      errorToast("400 error")
    } else if (status === 401) {
      errorToast("401 error")
    }
  } else if (error.request) {
    console.log(error.request)
    errorToast("Network error")
  }
  throw error
}

export default ApiErrorInterceptor
