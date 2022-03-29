import {useField} from "react-final-form";
import TextInput from "./TextInput";
import {computed} from "mobx";
import {css} from "../../helpers/css";
import {useControlledFormField, useFormField} from "./useFormField";
import {ValidatorFunction} from "./validation";

export interface BaseInputProps {
  name: string;
  value: string;
  onChange: (value: any) => void;
  label?: string;
  required?: boolean;
  horizontal?: boolean;
  validate?: ValidatorFunction[]
}

interface FormInputProps extends BaseInputProps {
  component: typeof TextInput
}

const FormInput: React.FC<FormInputProps> = ({
                                               name,
                                               value,
                                               onChange,
                                               label = false,
                                               component,
                                               horizontal,
                                               children,
                                               validate,
                                               ...rest
                                             }) => {
  const {input, meta} = useFormField(name, validate)
  useControlledFormField(input.onChange, value)
  const isInvalid = meta.error && meta.touched
  const Component = component

  return <div>
    {label && <FormLabel isInvalid={isInvalid}>{label}</FormLabel>}
    <Component {...input} {...rest} onChange={(value) => {
      input.onChange(value)
      onChange(value)
    }}/>
  </div>
}

const FormLabel: React.FC<{ isInvalid: boolean }> = ({children}) => {
  return <div className={css("mb-1", "text-neutral-400")}>
    {children}
  </div>
}

export default FormInput
