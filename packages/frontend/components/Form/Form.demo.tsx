import Form from "./Form";
import Demo from "../Demo/Demo";

const FormDemo = () => {
  return <Demo title={"Form"}>
    <Form onSubmit={async () => {console.log("submit")}}>

    </Form>
  </Demo>
}

export default FormDemo