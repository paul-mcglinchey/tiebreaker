import { IRota } from "../../../../models";
import { Button, Modal } from "../../../Common";
import { EmployeeMultiSelector } from "..";
import { useGroupService, useRotaService } from "../../../../hooks";
import { Form, Formik } from "formik";
import { useEffect } from "react";

interface IEditRotaEmployeesProps {
  isOpen: boolean,
  close: () => void,
  rota?: IRota
}

const EditRotaEmployeesModal = ({ isOpen, close, rota }: IEditRotaEmployeesProps) => {

  const { groupId } = useGroupService()
  const { updateRota } = useRotaService()

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
    <Modal 
      title="Edit rota employees"
      description="This dialog can be used to modify the employees belonging to a rota" 
      isOpen={isOpen} 
      close={close}
    >
      <Formik
        initialValues={{
          employees: rota?.employees || []
        }}
        onSubmit={(values) => {
          updateRota(values, rota?._id, groupId)
          close()
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