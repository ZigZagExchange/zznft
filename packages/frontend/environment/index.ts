import {Network} from "zksync/build/types";
import {objectKeys} from "../helpers/arrays";

export const isDev = () => process.env.NODE_ENV === "development"

interface Vars {
  TARGET_CHAIN_ID: number;
  TARGET_NETWORK_NAME: Network
}

export const vars: Vars = {
  TARGET_CHAIN_ID: Number(process.env.NEXT_PUBLIC_ETHEREUM_TARGET_CHAIN),
  TARGET_NETWORK_NAME: process.env.NEXT_PUBLIC_ETHEREUM_TARGET_NAME as Network
}

const assertVars = () => {
  objectKeys(vars).map(key => {
    if (vars[key] === undefined) {
      throw Error(`Missing environment variable: ${key}`)
    }
  })
}

assertVars()

