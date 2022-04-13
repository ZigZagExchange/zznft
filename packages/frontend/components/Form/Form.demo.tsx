import Form from "./Form";
import Demo from "../Demo/Demo";
import TextInput from "./TextInput";
import {useState} from "react";
import Button, {ButtonType, Submit} from "../Button/Button";
import {css} from "../../helpers/css";
import {sleep} from "zksync/build/utils";
import SelectInput from "./SelectInput";

const FormDemo = () => {
  const [value, setValue] = useState("test")
  const [selectValue, setSelectValue] = useState("test")
  const selectItems = [{name: "test", id: "test"}, {name: "anothertest", id: "anothertest"}]

  return <Demo title={"Form"}>
    <Form onSubmit={async (data) => {
      await sleep(500)
      alert("form submitted!")
    }}>
      <div className={css("flex", "items-end", "justify-between")}>
        <TextInput value={value} onChange={setValue} name={"test"} label={"Text Input"}/>
        <Button
          onClick={() => setValue((Math.random() + 1).toString(36).substring(7))}
          type={ButtonType.Black}>
          Change controlled
        </Button>
      </div>
      <div className={css("flex", "items-end", "justify-between", "mt-4")}>
        <SelectInput
          label={"Select Input"}
          defaultValue={"test"}
          name={"testSelect"}
          onChange={(val) => setSelectValue(val)}
          value={selectValue}
          items={selectItems}
        />
        <Button
          onClick={() => {
            const selectedIndex = selectItems.findIndex(item => item.id === selectValue)
            if (selectedIndex === selectItems.length - 1) {
              setSelectValue(selectItems[selectedIndex - 1].id)
            } else {
              setSelectValue(selectItems[selectedIndex + 1].id)
            }
          }}
          type={ButtonType.Black}>
          Change controlled
        </Button>
      </div>
      <div className={css("mt-8")}>
        <Submit block/>
      </div>
    </Form>
  </Demo>
}

export default FormDemo