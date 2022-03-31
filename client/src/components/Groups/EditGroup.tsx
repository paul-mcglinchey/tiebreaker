import { Form, Formik } from "formik";
import { useState } from "react";
import { ButtonType, IGroup } from "../../models";
import { IGroupService } from "../../services";
import { groupValidationSchema } from "../../utilities";
import { StyledField, Button, ColourPicker } from "../Common";

interface IEditGroupProps<TGroup> {
  toggleEditGroupOpen: () => void,
  groupService: IGroupService<TGroup>,
  g: IGroup
}

const EditGroup = <TGroup extends IGroup>({ toggleEditGroupOpen, groupService, g }: IEditGroupProps<TGroup>) => {

  const [groupColour, setGroupColour] = useState<string>(g.colour);

  return (
    <div className="relative bg-gray-900 px-8 py-5 rounded w-3/4 top-32 left-1/2 transform -translate-x-1/2">
      <div className="flex justify-between items-center border-b-2 border-gray-400/20 pb-2 mb-4">
        <h1 className="text-2xl font-bold text-white">Edit group</h1>
        <Button buttonType={ButtonType.Cancel} content='Cancel' action={toggleEditGroupOpen} />
      </div>
      <Formik
        initialValues={{
          'name': g.name,
          'description': g.description,
          'colour': groupColour
        }}
        validationSchema={groupValidationSchema}
        onSubmit={(values) => {
          groupService.updateGroup({ ...values, colour: groupColour }, g._id);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-1 flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <StyledField name="name" label="Groupname" errors={errors.name} touched={touched.name} />
                  <div className="self-end mb-1">
                    <ColourPicker square colour={groupColour} setColour={setGroupColour} />
                  </div>
                </div>
                <StyledField as="textarea" name="description" label="Description" errors={errors.description} touched={touched.description} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button content='Update group' />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditGroup;