import Select, {SelectProps} from "../Select/Select";
import FormInput, {BaseInputProps} from "./FormInput";

interface SelectInputProps extends BaseInputProps, Pick<SelectProps, 'items' | 'defaultValue'> {}

const SelectInput = (props: SelectInputProps) => {
  // TODO: separate out from general form input component

  //@ts-ignore
  return <FormInput {...props} component={Select}/>
}

export default SelectInput