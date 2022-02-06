import { Formik, Form } from 'formik';
import { sessionValidationSchema } from '../../utilities/schema';
import { SubmitButton } from '../Common';
import { endpoints } from '../../utilities/config';
import Userfront from '@userfront/core';
import { dateHelper, requestHelper } from '../../utilities';
import { CustomDate, StyledDatePicker, StyledField } from '..';

const AddNewSessionForm = ({ client, status, setStatus }) => {

  const handleSubmit = async (values) => {
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

    await fetch((endpoints.sessions), requestHelper.requestBuilder('POST', values))
      .then(res => {
        if (res.ok) {
          setStatus({ isLoading: false, success: `Added client successfully`, error: '' });
        } else {
          setStatus({ isLoading: false, success: '', error: `A problem occurred adding the client` });
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus({ isLoading: false, success: '', error: '' });
      })
  }

  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          description: '',
          date: '',
          tags: [],
          createdBy: '',
        }}
        validationSchema={sessionValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-grow flex-col space-y-3 content-end">
              <div className="flex flex-col md:flex-row md:space-x-2 space-x-0 space-y-1 md:space-y-0"></div>
              <StyledField name="title" placeholder="Title" errors={errors.title} touched={touched.title} />
              <StyledField as="textarea" name="description" placeholder="Description" errors={errors.description} touched={touched.description} />
              <StyledDatePicker name="sessionDate" label="Session Date" errors={errors.sessionDate} touched={touched.sessionDate} component={CustomDate} />
              <div className="flex justify-end my-10">
                <SubmitButton status={status} content="Add session" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default AddNewSessionForm;