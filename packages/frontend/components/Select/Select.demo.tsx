import Demo from "../Demo/Demo";
import Select from "./Select";
import {useState} from "react";

const SelectDemo = () => {
  const [value, setValue] = useState("empty")
  return <Demo title={"Select"}>
      <Select
        onChange={(val) => setValue(val)}
        value={value}
        items={[{id: "test", name: "test"}, {name: "empty", id: "empty"}]}/>
  </Demo>
}

export default SelectDemo
