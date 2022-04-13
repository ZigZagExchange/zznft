import {isDev} from "../environment";
import FormDemo from "../components/Form/Form.demo";
import TextFieldDemo from "../components/TextField/TextField.demo";
import { css } from "../helpers/css";
import SignMessageDemo from "../components/Demo/SignMessageDemo";
import ButtonDemo from "../components/Button/Button.demo";
import SelectDemo from "../components/Select/Select.demo";


const DSL = () => {
  return <div className={css("flex", "flex-col", "gap-5")}>
    <ButtonDemo/>
    <SelectDemo/>
    <TextFieldDemo/>
    <FormDemo/>
    <SignMessageDemo/>
  </div>
}

export function getStaticProps() {
  return {
    props: {},
    notFound: !isDev()
  }
}

export default DSL