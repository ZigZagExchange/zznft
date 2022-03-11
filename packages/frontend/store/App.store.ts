import {action, makeObservable, observable} from "mobx";
import {Wallet} from "zksync";
import {enableStaticRendering} from "mobx-react";
import {useMemo} from "react";
import {BigNumber, BigNumberish} from "ethers";
import ZKWalletStore from "./ZKWallet.store";

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

let store: AppStore | null = null

class AppStore {

  @observable
  zk: ZKWalletStore

   constructor() {
     makeObservable(this)
     console.log("debug:: calling app store constructor")
     this.zk = new ZKWalletStore()
   }

  @action
  hydrate = (data: AppStore) => {
    console.log("debug:: hydrate", data)
    if (!data) return
  }

}


function initializeStore(initialData = null) {
  const _store = store ?? new AppStore()

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


export function useStore() {
  const store = useMemo(() => initializeStore(), [])
  return store
}
