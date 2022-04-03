import {action, computed, makeObservable, observable} from "mobx";
import {Wallet} from "zksync";
import {enableStaticRendering} from "mobx-react";
import {useMemo} from "react";
import {BigNumber, BigNumberish} from "ethers";
import ZKWalletStore from "./ZKWallet.store";
import AuthStore from "./Auth.store";
import ModalsStore from "./Modals.store";

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

let store: _AppStore | null = null

export class _AppStore {

  @observable
  auth: AuthStore

  @observable
  modals: ModalsStore

  constructor() {
    makeObservable(this)
    this.auth = new AuthStore()
    this.modals = new ModalsStore()
  }

  @action
  hydrate = (data: _AppStore) => {
    if (!data) return
  }
}


function initializeStore(initialData = null) {
  let _store: _AppStore
  if (store) {
    _store = store
  } else {
    _store = new _AppStore()
  }

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

export const AppStore = initializeStore()
