import { Formik, Form } from 'formik';
import { useContext, useState } from 'react';

import { StyledField } from '..';
import { IAddGroup, IProps } from '../../models';
import { Status } from '../../models/types/status.type';
import { generateColour, requestBuilder } from '../../services';
import { groupValidationSchema, StatusContext } from '../../utilities';
import { ColourPicker, CustomCheckbox, SubmitButton } from '../Common';

const AddGroupForm = ({ endpoint }: IProps) => {

  const { status, setStatus } = useContext(StatusContext);

  const [isDefault, setIsDefault] = useState(false);
  const [groupColour, setGroupColour] = useState<string>(generateColour());

  const addGroup = (values: IAddGroup) => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }])

    fetch(endpoint, requestBuilder('POST', undefined, values))
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
        'default': isDefault,
        'groupColour': groupColour
      }}
      validationSchema={groupValidationSchema}
      onSubmit={(values) => {
        addGroup(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-1 flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <div className="flex w-full">
              <ColourPicker colour={groupColour} setColour={setGroupColour} hideIcon />
            </div>
            <div className="flex space-x-4">
              <StyledField name="groupName" label="Groupname" errors={errors.groupName} touched={touched.groupName} />
              <CustomCheckbox label="Default" state={isDefault} setState={setIsDefault} />
            </div>
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