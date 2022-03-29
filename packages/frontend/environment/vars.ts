import {Network} from "zksync/build/types";
import {objectKeys} from "../helpers/arrays";

interface Vars {
  TARGET_CHAIN_ID: number;
  TARGET_NETWORK_NAME: Network;
  INFURA_ID: string;
}

const vars: Vars = {
  TARGET_CHAIN_ID: Number(process.env.NEXT_PUBLIC_ETHEREUM_TARGET_CHAIN),
  TARGET_NETWORK_NAME: process.env.NEXT_PUBLIC_ETHEREUM_TARGET_NAME as Network,
  INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID as string
}

const assertVars = () => {
  objectKeys(vars).map(key => {
    if (vars[key] === undefined) {
      throw Error(`Missing environment variable: ${key}`)
    }
  })
}
assertVars()

export {vars};