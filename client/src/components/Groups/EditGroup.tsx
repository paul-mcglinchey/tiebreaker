import { Form, Formik } from "formik";
import { useState } from "react";
import { IGroup } from "../../models";
import { generateColour, IGroupService } from "../../services";
import { groupValidationSchema } from "../../utilities";
import { StyledField, Button, ColourPicker, Modal } from "../Common";

interface IEditGroupProps<TGroup> {
  editGroupOpen: boolean,
  toggleEditGroupOpen: () => void,
  groupService: IGroupService<TGroup>,
  g: IGroup
}

const EditGroup = <TGroup extends IGroup>({ editGroupOpen, toggleEditGroupOpen, groupService, g }: IEditGroupProps<TGroup>) => {

  const [groupColour, setGroupColour] = useState<string>(g.colour || generateColour());

  return (
    <Modal title="Edit group" modalOpen={editGroupOpen} toggleModalOpen={toggleEditGroupOpen}>
      <Formik
        initialValues={g || {
          'name': '',
          'description': '',
          'colour': groupColour
        }}
        validationSchema={groupValidationSchema}
        onSubmit={(values) => {
          groupService.updateGroup({ ...values, colour: groupColour }, g._id || "");
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
    </Modal>
  )
}

export default EditGroup;