import {makeObservable, observable} from "mobx";
import {Http} from "../../services";

class SignMessageDemoStore {
  @observable
  message = ""

  constructor() {
    makeObservable(this)
  }

  async signMessage() {
    const body = {message: this.message}
    return Http.post("/account/asdflkasjdf", body)
  }

}

export default SignMessageDemoStore
