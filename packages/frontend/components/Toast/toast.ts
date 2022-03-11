import {toast} from "react-toastify";
import {isDev} from "../../environment";


export const successToast = (message: string) => {
  toast(message, {type: "success"})
}

export const errorToast = (message: string) => {
  toast(message, {type: "error"})
}

export const debugToast = (message: string) => {
  if(isDev()) {
    toast(message, {type: "warning"})
  }
}
