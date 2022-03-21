import {useEnsLookup} from "wagmi";
import {abbreviate} from "../helpers/strings";

const useDisplayName = (address?: string) => {
  const [{ data, error, loading }] = useEnsLookup({address})
  let displayName
  if (address) {
    displayName = data ? data : abbreviate(address)
  }

  return {
    displayName,
    error,
    loading
  }
}

export default useDisplayName
