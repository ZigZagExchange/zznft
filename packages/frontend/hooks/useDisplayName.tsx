import {abbreviate, isValidEthereumAddress} from "../helpers/strings";
import {AppStore} from "../store/AppStore";

const useDisplayName = (address?: string) => {
  // const [{ data, error, loading }] = useEnsLookup({address})
  let displayName
  if (address) {
    if (AppStore.auth.account) {
      displayName = AppStore.auth.account.displayName
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
