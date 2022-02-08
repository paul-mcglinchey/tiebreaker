import { useState } from 'react';
import { Formik, Form } from 'formik';
import { sessionValidationSchema } from '../../utilities/schema';
import { SubmitButton } from '../Common';
import { endpoints } from '../../utilities/config';
import Userfront from '@userfront/core';
import { requestHelper } from '../../utilities';
import { CustomDate, StyledDatePicker, StyledField, StyledTagField } from '..';

const AddNewSessionForm = ({ client, status, setStatus }) => {

  const [tags, setTags] = useState([]);

  const handleSubmit = async (values) => {

    console.log('here');
    setStatus({
      isLoading: true,
      success: '',
      error: ''
    })

    if (!client) {
      setStatus({
        isLoading: false,
        success: '',
        error: 'No client found'
      })

      return;
    }

    values.createdBy = values.updatedBy = Userfront.user.username;

    await fetch((endpoints.sessions(client)), requestHelper.requestBuilder('POST', values))
      .then(res => {
        if (res.ok) {
          setStatus({ isLoading: false, success: `Added session successfully`, error: '' });
        } else {
          setStatus({ isLoading: false, success: '', error: `A problem occurred adding the session` });
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus({ isLoading: false, success: '', error: '' });
      })
  }

  return (
    <div className="flex flex-1 space-x-6">
      <Formik
        initialValues={{
          title: '',
          description: '',
          sessionDate: '',
          tags: tags,
          createdBy: '',
        }}
        validationSchema={sessionValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-grow flex-col lg:max-w-2/3">
            <div className="flex flex-col space-y-3 content-end">
              <div className="flex flex-col md:flex-row md:space-x-2 space-x-0 space-y-1 md:space-y-0"></div>
              <StyledField name="title" label="Title" errors={errors.title} touched={touched.title} />
              <StyledField as="textarea" name="description" label="Description" errors={errors.description} touched={touched.description} />
              <div className="flex flex-col sm:flex-row item-center space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
                <StyledDatePicker name="sessionDate" label="Session Date" errors={errors.sessionDate} touched={touched.sessionDate} component={CustomDate} />
                <StyledTagField name="tags" label="Tags" errors={errors.tags} touched={touched.tags} tags={tags} setTags={setTags} />
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <SubmitButton status={status} content="Add session" />
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex flex-grow px-4 py-4 bg-gray-900 rounded shadow-md text-gray-400 max-w-1/3">
        <h1 className="text-gray-200 text-2xl font-semibold">Previous sessions</h1>
        <div>
          {client.sessions && client.sessions.map(s => (
            <div>{s.title}</div>
          ))}
        </div>
      </div>
    </div >
  )
}

export default AddNewSessionForm;