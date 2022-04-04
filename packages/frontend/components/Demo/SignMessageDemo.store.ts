import {makeObservable, observable} from "mobx";
import {AppStore} from "../../store/AppStore";
import {Http} from "../../services";

class SignMessageDemoStore {
  @observable
  message = ""

  constructor() {
    makeObservable(this)
  }

  async signMessage() {
    const body = {message: this.message}
    const headers = await AppStore.auth.getApiSignatureHeaders(body)
    return Http.post("/account/asdflkasjdf", body, {headers})
  }

}

export default SignMessageDemoStore
