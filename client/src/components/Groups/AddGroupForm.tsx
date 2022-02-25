import { Formik, Form } from 'formik';
import { useContext } from 'react';

import { StyledField } from '..';
import { IAddGroup } from '../../models';
import { Status } from '../../models/types/status.type';
import { requestBuilder } from '../../services';
import { ApplicationContext, endpoints, groupValidationSchema } from '../../utilities';
import SubmitButton from '../Common/SubmitButton';

const AddGroupForm = () => {

  const { status, setStatus } = useContext(ApplicationContext);

  const addGroup = (values: IAddGroup) => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }])

    fetch(endpoints.groups, requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          setStatus([...status, { isLoading: false, message: `Successfully created ${values.groupName}`, type: Status.Success }])
        } else if (res.status === 400) {
          setStatus([...status, { isLoading: false, message: 'Group already exists', type: Status.Error }])
        } else {
          setStatus([...status, { isLoading: false, message: `A problem occurred creating ${values.groupName}`, type: Status.Success }])
        }
    })
      .catch(() => {
        setStatus([...status, { isLoading: false, message: `A problem occurred creating the group`, type: Status.None }])
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