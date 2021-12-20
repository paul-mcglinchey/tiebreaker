import { useState } from 'react';
import { Formik, Form } from 'formik';

import { StyledField } from '..';
import { endpoints, requestHelper, groupValidationSchema } from '../../utilities';

const CreateGroupForm = (props) => {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const createGroup = (values) => {

    setError();
    setSuccess();

    fetch(endpoints.creategroup, requestHelper.requestBuilder('POST', values))
      .then((response => response.json()))
      .then((data) => {
        if (data.message) {
          setError(data.message)
        } else {
          setSuccess(data.success);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
  }

  return (
    <Formik
      initialValues={{
        'groupname': '',
        'default': false
      }}
      validationSchema={groupValidationSchema}
      onSubmit={(values) => {
        createGroup(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-1 flex-col space-y-8">
          <div className="flex">
            <StyledField name="groupname" placeholder="Groupname" errors={errors.groupname} touched={touched.groupname} />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="hover:bg-purple-brand hover:text-white border-2 border-purple-brand font-bold text-purple-brand rounded-lg py-1 px-3 transition-all">
              Add group
            </button>
          </div>
          <div className="flex justify-end space-y-4">
            {error && (
              <div className="p-2 font-medium rounded-lg border-2 border-red-500 text-red-500">
                {error}
              </div>
            )}
            {success && (
              <div className="p-2 font-medium rounded-lg border-2 border-green-500 text-green-500">
                {success}
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CreateGroupForm;