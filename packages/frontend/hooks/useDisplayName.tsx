import {abbreviate, isValidEthereumAddress} from "../helpers/strings";
import {useEnsLookup} from "wagmi";

const useDisplayName = (address?: string) => {
  const [{ data, error, loading }] = useEnsLookup({address})

  let displayName: string
  if (data) {
    displayName = data
  } else if (address && isValidEthereumAddress(address)) {
    displayName = abbreviate(address)
  } else {
    displayName = "..."
  }

  return {
    displayName,
  }
}

export default useDisplayName
