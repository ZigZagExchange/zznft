import {ethers} from "ethers";

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
