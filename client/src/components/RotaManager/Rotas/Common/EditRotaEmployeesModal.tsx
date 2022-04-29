import { IRota } from "../../../../models";
import { Button, Modal } from "../../../Common";
import { EmployeeListSelector } from "..";
import { useEmployeeService, useGroupService, useRotaService } from "../../../../hooks";
import { Form, Formik } from "formik";

interface IEditRotaEmployeesProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  rota?: IRota
}

const EditRotaEmployeesModal = ({ modalOpen, toggleModalOpen, rota }: IEditRotaEmployeesProps) => {

  const { updateRota } = useRotaService()
  const { getEmployees } = useEmployeeService()
  const { groupId } = useGroupService()

  return (
    <Modal title="Edit rota employees" modalOpen={modalOpen} toggleModalOpen={toggleModalOpen}>
      <Formik
        initialValues={{
          employees: rota?.employees || []
        }}
        onSubmit={(values) => {
          updateRota(values, rota?._id, groupId)
          toggleModalOpen()
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <EmployeeListSelector employeeIds={getEmployees().filter(e => e._id).map(e => e._id)} formValues={values.employees} setFieldValue={(e) => setFieldValue('employees', e)} />
            <div className="flex justify-end mt-10">
              <Button type="submit" content='Update' />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default EditRotaEmployeesModal