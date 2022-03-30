import {ethers} from "ethers";
const contentHash = require("content-hash")

export const abbreviate = (input: string, spaces: number = 4) => {
  return `${input.substring(0,spaces)}...${input.substring(input.length-spaces, input.length)}`
}

export const jsonify = (value: any) => JSON.stringify(value)

export const isValidEthereumAddress = (address: string) => {
  try {
    ethers.utils.getAddress(address)
    return true
  } catch {
    return false
  }
}

// https://github.com/ethereum/EIPs/blob/master/EI PS/eip-1577.md
  const SECRET_BYTES = "e30101701220"

export const getContentHashFromCID = (cid: string) => {
  return "0x" + contentHash.fromIpfs(cid).split(SECRET_BYTES)[1]
}

export const getCIDfromContentHash = (hash: string) => {
  return contentHash.decode(SECRET_BYTES + hash.split("0x")[1])
}
