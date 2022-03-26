import {isDev} from "../environment";
import FormDemo from "../components/Form/Form.demo";
import TextFieldDemo from "../components/TextField/TextField.demo";
import { css } from "../helpers/css";


const DSL = () => {
  return <div className={css("flex", "flex-col", "gap-5")}>
    <TextFieldDemo/>
    <FormDemo/>
  </div>
}

export function getStaticProps() {
  return {
    props: {},
    notFound: !isDev()
  }
}

export default DSL