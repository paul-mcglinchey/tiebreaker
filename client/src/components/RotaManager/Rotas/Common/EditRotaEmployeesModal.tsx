import { IRota } from "../../../../models";
import { Button, Modal } from "../../../Common";
import { EmployeeMultiSelector } from "..";
import { useGroupService, useRotaService } from "../../../../hooks";
import { Form, Formik } from "formik";
import { useEffect } from "react";

interface IEditRotaEmployeesProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  rota?: IRota
}

const EditRotaEmployeesModal = ({ modalOpen, toggleModalOpen, rota }: IEditRotaEmployeesProps) => {

  const { updateRota } = useRotaService()
  const { groupId } = useGroupService()

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
  }, [])

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault()
      document.getElementById('filter')?.focus()
    }
  }

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
            <EmployeeMultiSelector formValues={values.employees} setFieldValue={(e) => setFieldValue('employees', e)} />
            <div className="flex justify-end mt-10">
              <Button type="submit" content='Update employees' />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default EditRotaEmployeesModal