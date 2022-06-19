import { Form, Formik } from "formik";
import { useGroupService } from "../../hooks";
import { IGroup } from "../../models";
import { generateColour } from "../../services";
import { groupValidationSchema } from "../../schema";
import { Button, ColourPicker, StyledField } from "../Common";

interface IGroupFormProps {
  group?: IGroup | undefined
  submitButton?: JSX.Element
  additionalSubmissionActions?: (() => void)[]
}

const GroupForm = ({ group, submitButton, additionalSubmissionActions }: IGroupFormProps) => {

  const { addGroup, updateGroup } = useGroupService()

  return (
    <Formik
      initialValues={{
        name: group?.name || '',
        description: group?.description || '',
        colour: group?.colour || generateColour()
      }}
      validationSchema={groupValidationSchema}
      onSubmit={(values) => {
        group?._id ? updateGroup(values, group?._id) : addGroup(values)

        additionalSubmissionActions?.forEach(asa => asa())
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="flex flex-1 flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <StyledField name="name" label="Groupname" errors={errors.name} touched={touched.name} />
                <div className="self-end mb-1">
                  <ColourPicker square colour={values.colour} setColour={(pc) => setFieldValue('colour', pc)} />
                </div>
              </div>
              <StyledField as="textarea" name="description" label="Description" errors={errors.description} touched={touched.description} />
            </div>
          </div>
          <div className="flex justify-end">
            {submitButton ? submitButton : <Button content='Add group' />}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default GroupForm;