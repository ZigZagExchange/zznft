import {action, computed, makeObservable, observable} from "mobx";
import {Wallet} from "zksync";
import {enableStaticRendering} from "mobx-react";
import {useMemo} from "react";
import {BigNumber, BigNumberish} from "ethers";
import ZKWalletStore from "./ZKWallet.store";
import AuthStore from "./Auth.store";

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

let store: AppStore | null = null

export class AppStore {

  @observable
  auth: AuthStore

   constructor() {
     makeObservable(this)
     this.auth = new AuthStore()
   }

  @action
  hydrate = (data: AppStore) => {
    if (!data) return
  }
}


function initializeStore(initialData = null) {
  let _store: AppStore
  if (store) {
    _store = store
  } else {
    _store = new AppStore()
  }

  console.log(_store)

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export const appStore = initializeStore()
