import Userfront from '@userfront/core';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import endpoints from '../config/endpoints';
import GroupSchema from '../helpers/groupValidationSchema';
import StyledField from './forms/StyledField';
import CustomCheckbox from './CustomCheckbox';

const CreateGroupForm = (props) => {

  const { getGroups } = props;

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const createGroup = (values) => {

    setError();
    setSuccess();

    fetch(endpoints.creategroup, {
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
        'groupname': '',
        'default': false
      }}
      validationSchema={GroupSchema}
      onSubmit={(values) => {
        createGroup(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col">
          <div className="flex flex-grow">
            <StyledField name="groupname" placeholder="Groupname" errors={errors.groupname} touched={touched.groupname} />
            <div className="flex flex-col">
              <label className="block font-bold text-gray-500 mb-1 uppercase">
                Default
              </label>
              <div className="self-center">
                <CustomCheckbox />
              </div>
            </div>
          </div>
          <div className="sm:relative absolute w-full bottom-0 left-0 p-2 lg:mb-4">
            <button type="submit" className="w-full bg-gray-200 hover:bg-gray-300 font-bold rounded py-2">
              Add group
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CreateGroupForm;