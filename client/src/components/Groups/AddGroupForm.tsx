import { Formik, Form } from 'formik';

import { StyledField } from '..';
import { IAddGroup, IStatusProps } from '../../models';
import { requestBuilder } from '../../services';
import { endpoints, groupValidationSchema } from '../../utilities';
import SubmitButton from '../Common/SubmitButton';

const AddGroupForm = ({ status, setStatus }: IStatusProps) => {

  const addGroup = (values: IAddGroup) => {
    setStatus({
      isLoading: true,
      success: '',
      error: ''
    })

    fetch(endpoints.groups, requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          setStatus({ isLoading: false, success: `Successfully created ${values.groupName}`, error: '' })
        } else if (res.status === 400) {
          setStatus({ isLoading: false, success: '', error: 'Group already exists'})
        } else {
          setStatus({ isLoading: false, success: '', error: `A problem occurred creating ${values.groupName}` })
        }
      })

      .catch((err) => {
        console.log(err)
        setStatus({ isLoading: false, success: '', error: '' })
      })
  }

  return (
    <Formik
      initialValues={{
        'groupName': '',
        'default': false
      }}
      validationSchema={groupValidationSchema}
      onSubmit={(values) => {
        addGroup(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-1 flex-col space-y-8">
          <div className="flex">
            <StyledField name="groupName" label="Groupname" errors={errors.groupName} touched={touched.groupName} />
          </div>
          <div className="flex justify-end">
            <SubmitButton status={status} content='Create group' />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddGroupForm;