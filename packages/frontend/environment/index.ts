import development from "./development";
import production from "./production";

const isDev = () => process.env.NODE_ENV === "development"
const isProduction = () => process.env.NODE_ENV === "production"

interface Environment {
  api: {
    baseURL: string;
    proxyURL?: string;
  }
}
 let env: Environment
if (isDev()) {
  env = development
} else if (isProduction()) {
  env = production
} else {
  throw Error("Could not find correct environment")
}


export {isDev, env as default}


