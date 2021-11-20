import { Field } from "formik"

const StyledField = (props) => {
  return (
    <div className="flex flex-grow border-2 border-blue-300 rounded p-2">
      <Field
        className="flex-grow focus:outline-none"
        name={props.name}
        placeholder={props.placeholder}
      />
      {props.children}
    </div>
  )
}

export default StyledField;