import Form from "./Form";
import Demo from "../Demo/Demo";
import TextInput from "./TextInput";
import {useState} from "react";
import Button, {ButtonType, Submit} from "../Button/Button";
import {css} from "../../helpers/css";

const FormDemo = () => {
  const [value, setValue] = useState("")
  return <Demo title={"Form"}>
    <Form onSubmit={async (data) => {console.log("submit", data)}}>
      <div className={css("flex", "gap-7", "items-end")}>
        <TextInput value={value} onChange={setValue} name={"test"} label={"Text Input"}/>
        <Button onClick={() => setValue("testyyy")} type={ButtonType.Black}>Change controlled</Button>
      </div>
      <div className={css("mt-5")}>
        <Submit/>
      </div>
    </Form>
  </Demo>
}

export default FormDemo