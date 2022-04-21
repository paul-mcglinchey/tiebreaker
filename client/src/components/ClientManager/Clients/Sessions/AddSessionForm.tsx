import { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import { sessionValidationSchema } from '../../../../utilities/schema';
import { Button } from '../../../Common';
import { CustomDate, StyledField, StyledTagField } from '../../..';
import { IClient, ITag } from '../../../../models';
import { useClientService } from '../../../../hooks';
import { ApplicationContext } from '../../../../utilities';

const currentDate = new Date();
const currentDateAsString = currentDate.toISOString().split('T')[0];

interface IAddSessionProps {
  client: IClient
}

const AddSessionForm = ({ client }: IAddSessionProps) => {

  const [tags, setTags] = useState<ITag[]>([])

  const clientService = useClientService()
  const { groupId } = useContext(ApplicationContext)

  return (
    <div className="flex flex-1">
      <Formik
        initialValues={{
          title: '',
          description: '',
          sessionDate: currentDateAsString || '',
          createdBy: '',
        }}
        validationSchema={sessionValidationSchema}
        onSubmit={(values, { resetForm }) => {
          clientService.addSession({ ...values, tags: tags }, client._id, groupId);
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
              <Button content="Add session" />
            </div>
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default AddSessionForm;