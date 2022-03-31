import { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import { sessionValidationSchema } from '../../../../utilities/schema';
import { Button } from '../../../Common';
import { endpoints } from '../../../../utilities/config';
import { CustomDate, StyledField, StyledTagField } from '../../..';
import { requestBuilder } from '../../../../services';
import { IClientProps, ITag } from '../../../../models';
import { IAddSession } from '../../../../models/add-session.model';
import { Status } from '../../../../models/types/status.type';
import { StatusContext } from '../../../../utilities';

const currentDate = new Date();
const currentDateAsString = currentDate.toISOString().split('T')[0];

const AddSessionForm = ({ client }: IClientProps) => {

  const { status, setStatus } = useContext(StatusContext);
  const [tags, setTags] = useState<ITag[]>([]);

  const handleSubmit = async (values: IAddSession) => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }])

    if (!client) {
      setStatus([...status, {
        isLoading: false,
        message: 'No client found',
        type: Status.Error
      }])
      return;
    }

    // Adding user metadata and tags to the post body
    values.tags = [];

    tags.forEach((t: ITag) => {
      values.tags!.push(t.value);
    })

    await fetch((endpoints.sessions(client._id)), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) {
          setStatus([...status, { isLoading: false, message: `Added session messagefully`, type: Status.Success }]);
        } else {
          setStatus([...status, { isLoading: false, message: `A problem occurred adding the session`, type: Status.Error }]);
        }
      })
      .catch(() => {
        setStatus([...status, { isLoading: false, message: `A problem occurred adding the session`, type: Status.Error }]);
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
                <StyledField type="date" name="sessionDate" label="Session Date" errors={errors.sessionDate} touched={touched.sessionDate} component={CustomDate} />
                <StyledTagField name="tags" label="Tags" tags={tags} setTags={setTags} errors={undefined} touched={undefined} />
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <Button status={status} content="Add session" />
            </div>
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default AddSessionForm;