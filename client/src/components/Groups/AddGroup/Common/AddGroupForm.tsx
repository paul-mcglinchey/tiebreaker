import { Formik, Form } from 'formik';
import { useState } from 'react';

import { StyledField } from '../../..';
import { IAddGroupFormProps, IGroup } from '../../../../models';
import { generateColour } from '../../../../services';
import { groupValidationSchema } from '../../../../utilities';
import { ColourPicker, CustomCheckbox, SubmitButton } from '../../../Common';

const AddGroupForm = <TGroup extends IGroup>({ groupService }: IAddGroupFormProps<TGroup>) => {
  const [isDefault, setIsDefault] = useState(false);
  const [groupColour, setGroupColour] = useState<string>(generateColour());

  return (
    <Formik
      initialValues={{
        'groupName': '',
        'default': isDefault,
        'groupColour': groupColour
      }}
      validationSchema={groupValidationSchema}
      onSubmit={(values) => {
        groupService.addGroup(values);
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
            <SubmitButton content='Create group' />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddGroupForm;