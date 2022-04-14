import {Form as FinalForm} from "react-final-form"
import {FORM_ERROR, FormApi} from "final-form";
import {DevToggle} from "../../environment/Dev";
import {jsonify} from "../../helpers/strings";
import ApiError from "../../services/errors/Api.error";


interface FormProps {
  onSubmit: (data: Record<string, any>, form: FormApi) => Promise<any>
}

const Form: React.FC<FormProps> = ({children, onSubmit}) => {

  const apiErrorMiddleware = (data: Record<string, any>, form: FormApi) => {
    return onSubmit(data, form).catch(e => {
      if (e instanceof ApiError) {
        return {[FORM_ERROR]: e.message}
      } else {
        throw e
      }
    })
  }

  return <FinalForm
    onSubmit={(data, form) => apiErrorMiddleware(data, form)}
    render={({handleSubmit, submitError, values}) => {
      return <>
        <form onSubmit={handleSubmit}>
          {children}
        </form>
        {/*<DevToggle>*/}
        {/*  {jsonify(values)}*/}
        {/*</DevToggle>*/}
      </>}}
  />
}

export default Form
