import { Form, Formik } from "formik";
import { IProps } from "../../models";
import { groupValidationSchema } from "../../utilities";
import { StyledField, SubmitButton } from "../Common";

const EditGroup = ({ toggleEditGroupOpen, groupService, g }: IProps) => {
  return (
    <div className="relative bg-gray-900 px-8 py-5 rounded w-3/4 left-1/2 transform -translate-x-1/2">
      <div className="flex justify-between items-center border-b-2 border-gray-400/20 pb-2 mb-4">
        <h1 className="text-2xl font-bold text-white">Edit group</h1>
        <button onClick={() => toggleEditGroupOpen()} type="button" className="text-red-500 font-semibold tracking-wide hover:text-red-600">cancel</button>
      </div>
      <Formik
        initialValues={g}
        validationSchema={groupValidationSchema}
        onSubmit={(values) => {
          groupService.updateGroup(values, g._id);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-1 flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-4">
                <StyledField name="name" label="Groupname" errors={errors["name"]} touched={touched["name"]} />
                <StyledField name="description" label="Description" errors={errors["description"]} touched={touched["description"]} />
              </div>
            </div>
            <div className="flex justify-end">
              <SubmitButton content='Update group' />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditGroup;