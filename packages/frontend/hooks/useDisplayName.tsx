import {abbreviate, isValidEthereumAddress} from "../helpers/strings";
import {appStore} from "../store/App.store";

const useDisplayName = (address?: string) => {
  // const [{ data, error, loading }] = useEnsLookup({address})
  let displayName
  if (address) {
    if (appStore.auth.account) {
      displayName = appStore.auth.account.displayName
    } else {
      displayName = abbreviate(address)
    }
  }

  if (displayName) {
    if (isValidEthereumAddress(displayName)) {
      displayName = abbreviate(displayName)
    }
  }

  return {
    displayName,
  }
}

export default useDisplayName
