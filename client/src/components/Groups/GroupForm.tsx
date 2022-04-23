import { Form, Formik } from "formik";
import { useState } from "react";
import { IGroup } from "../../models";
import { generateColour } from "../../services";
import { groupValidationSchema } from "../../utilities";
import { Button, ColourPicker, StyledField } from "../Common";

interface IGroupFormProps {
  g?: IGroup,
  handleSubmit: (values: IGroup, groupId?: string) => void,
  submitButton?: JSX.Element
}

const GroupForm = ({ g = {}, handleSubmit, submitButton }: IGroupFormProps) => {

  const [groupColour, setGroupColour] = useState<string>(g.colour || generateColour());

  return (
    <Formik
      initialValues={{
        name: g.name || '',
        description: g.description || '',
      }}
      validationSchema={groupValidationSchema}
      onSubmit={(values) => {
        handleSubmit({ ...values, colour: groupColour }, g._id || "");
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-1 flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <StyledField name="name" label="Groupname" errors={errors.name} touched={touched.name} />
                <div className="self-end mb-1">
                  <ColourPicker square colour={groupColour} setColour={setGroupColour} />
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