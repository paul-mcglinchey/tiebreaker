import { Form, Formik } from "formik";
import { useGroupService } from "../../hooks";
import { IContextualFormProps, IGroup } from "../../models";
import { generateColour } from "../../services";
import { groupValidationSchema } from "../../schema";
import { ColourPicker, FormSection, StyledField } from "../Common";
import { ApplicationMultiSelector, UserPermissionSelector } from '.'

interface IGroupFormProps {
  group?: IGroup | undefined
}

const GroupForm = ({ group, ContextualSubmissionButton }: IGroupFormProps & IContextualFormProps) => {

  const { addGroup, updateGroup } = useGroupService()

  return (
    <Formik
      initialValues={{
        name: group?.name || '',
        description: group?.description || '',
        applications: group?.applications || [],
        colour: group?.colour || generateColour(),
        users: group?.users || []
      }}
      validationSchema={groupValidationSchema}
      onSubmit={(values) => {
        group?._id ? updateGroup(values, group?._id) : addGroup(values)
      }}
    >
      {({ errors, touched, values, setFieldValue, isValid }) => (
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
          <FormSection title="Group Applications">
            <ApplicationMultiSelector
              formValues={values.applications}
              setFieldValue={(a) => setFieldValue('applications', a)}
            />
          </FormSection>
          {group && (
            <FormSection title="User Permissions">
              <UserPermissionSelector group={values} onChange={(users) => setFieldValue('users', users)} />
            </FormSection>
          )}
          {ContextualSubmissionButton(group ? 'Update group' : 'Create group', undefined, isValid)}
        </Form>
      )}
    </Formik>
  )
}

export default GroupForm;