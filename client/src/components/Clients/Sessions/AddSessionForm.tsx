import { useState } from 'react';
import { Formik, Form } from 'formik';
import { sessionValidationSchema } from '../../../utilities/schema';
import { SubmitButton } from '../../Common';
import { endpoints } from '../../../utilities/config';
import Userfront from '@userfront/core';
import { CustomDate, StyledDatePicker, StyledField, StyledTagField } from '../..';
import { requestBuilder } from '../../../services';

const currentDate = new Date();
const currentDateAsString = currentDate.toISOString().split('T')[0];

const AddSessionForm = ({ client, status, setStatus }) => {

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

    // Adding user metadata and tags to the post body
    values.createdBy = values.updatedBy = Userfront.user.username;
    values.tags = [];

    tags.forEach(t => {
      values.tags.push(t.value);
    })

    await fetch((endpoints.sessions(client)), requestBuilder('PUT', undefined, values))
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
    <div className="flex flex-1">
      <Formik
        initialValues={{
          title: '',
          description: '',
          sessionDate: currentDateAsString,
          createdBy: '',
        }}
        validationSchema={sessionValidationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-grow flex-col">
            <div className="flex flex-col space-y-3 content-end">
              <div className="flex flex-col md:flex-row md:space-x-2 space-x-0 space-y-1 md:space-y-0"></div>
              <StyledField name="title" label="Title" errors={errors.title} touched={touched.title} />
              <StyledField as="textarea" name="description" label="Description" errors={errors.description} touched={touched.description} />
              <div className="flex flex-col sm:flex-row item-center space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
                <StyledDatePicker name="sessionDate" label="Session Date" errors={errors.sessionDate} touched={touched.sessionDate} component={CustomDate} />
                <StyledTagField name="tags" label="Tags" tags={tags} setTags={setTags} errors={undefined} touched={undefined} />
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <SubmitButton status={status} content="Add session" />
            </div>
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default AddSessionForm;