import TextField, {TextFieldProps} from "../TextField/TextField";
import FormInput, {BaseInputProps} from "./FormInput";


interface TextInputProps extends BaseInputProps, Pick<TextFieldProps, 'placeholder' | 'block' | 'disabled'> {}

const TextInput = (props: TextInputProps) => {
  return <FormInput {...props} component={TextField}/>
}

export default TextInput
