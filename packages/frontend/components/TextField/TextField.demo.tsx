import Demo, {SubDemo} from "../Demo/Demo";
import TextField from "./TextField";

const TextFieldDemo = () => {
  return <Demo title={"TextField"}>
    <SubDemo title={"Textfield"}>
      <TextField placeholder={"hello"}/>
    </SubDemo>
    <SubDemo title={"Disabled"}>
      <TextField disabled/>
    </SubDemo>
    <SubDemo title={"Loading"}>
      <TextField isLoading/>
    </SubDemo>
  </Demo>
}

export default TextFieldDemo
