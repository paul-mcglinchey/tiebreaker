import Userfront from '@userfront/core';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import endpoints from '../config/endpoints';
import GroupSchema from '../helpers/groupValidationSchema';
import StyledField from './forms/StyledField';

const CreateGroupForm = (props) => {

  const { getGroups } = props;

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const createGroup = (values) => {

    setError();
    setSuccess();

    fetch(endpoints.creategroup, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Userfront.tokens.accessToken}`
      },
      body: JSON.stringify(values)
    })
      .then((response => response.json()))
      .then((data) => {
        if (data.message) {
          setError(data.message)
        } else {
          setSuccess(data.success);
          getGroups();
        }
      })
      .catch((error) => {
        setError(error.message);
      })
  }

  return (
    <Formik
      initialValues={{
        'groupname': ''
      }}
      validationSchema={GroupSchema}
      onSubmit={(values) => {
        console.log(values);
        createGroup(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex md:w-1/2 w-full">
          <div className="flex flex-col flex-grow space-y-4">
            <StyledField name="groupname" placeholder="Group name" errors={errors.groupname} touched={touched.groupname} />
            <div className="flex flex-grow justify-end text-center mb-10">
              <button type="submit" className="py-1 px-3 bg-white text-gray-500 border-2 border-green-500 rounded-lg font-medium hover:text-white hover:bg-green-500 transition-all">Create</button>
            </div>
            {(error || success) &&
              <div className="flex flex-grow justify-center text-center">
                <div type="submit" className={`w-full py-1 px-3 bg-white text-gray-500 border-2 ${success ? "border-green-500" : "border-red-500"} rounded-lg font-medium`}>{error}{success}</div>
              </div>
            }
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CreateGroupForm;