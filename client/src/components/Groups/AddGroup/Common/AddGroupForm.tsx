import { Formik, Form } from 'formik';
import { useState } from 'react';

import { StyledField } from '../../..';
import { IAddGroupFormProps, IGroup } from '../../../../models';
import { generateColour } from '../../../../services';
import { groupValidationSchema } from '../../../../utilities';
import { ColourPicker, SubmitButton } from '../../../Common';

const AddGroupForm = <TGroup extends IGroup>({ groupService }: IAddGroupFormProps<TGroup>) => {
  const [groupColour, setGroupColour] = useState<string>(generateColour());

  return (
    <Formik
      initialValues={{
        'name': '',
        'description': '',
        'colour': groupColour
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
              <StyledField name="name" label="Groupname" errors={errors.name} touched={touched.name} />
              <StyledField name="description" label="Description" errors={errors.description} touched={touched.description} />
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