import { useState } from 'react';
import { Formik, Form } from 'formik';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import { useEmployeeService, useGroupService, useRotaService } from '../../hooks';
import { IListValue, IRota } from '../../models';
import { rotaValidationSchema } from '../../schema';
import { generateColour } from '../../services';
import { Button, StyledField, FormSection } from '../Common';
import { EmployeeMultiSelector, AddEmployeeModal } from '.';

interface IRotaFormProps {
  rota?: IRota | undefined,
  submitButton?: JSX.Element;
  additionalSubmissionActions?: (() => void)[]
}

const RotaForm = ({ rota, submitButton, additionalSubmissionActions }: IRotaFormProps) => {

  const [addEmployeesOpen, setAddEmployeesOpen] = useState(false)

  const weekdaysList: IListValue[] = [{
    _id: 'MON',
    short: 'MON',
    long: 'Monday',
    colour: generateColour()
  }, {
    _id: 'TUE',
    short: 'TUE',
    long: 'Tuesday',
    colour: generateColour()
  }]

  const { currentGroup } = useGroupService()
  const { addRota, updateRota } = useRotaService()

  const { getEmployees } = useEmployeeService()
  const employees = getEmployees()

  return (
    <>
      <Formik
        initialValues={{
          name: rota?.name || '',
          description: rota?.description || '',
          startDay: rota?.startDay || weekdaysList[0]?._id,
          closingHour: rota?.closingHour || 22,
          employees: rota?.employees || [],
          checked: false
        }}
        validationSchema={rotaValidationSchema}
        onSubmit={(values, actions) => {
          rota?._id ? updateRota(values, rota?._id, currentGroup?._id) : addRota(values, currentGroup?._id)

          additionalSubmissionActions?.forEach(asa => asa())
          actions.resetForm();
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="flex flex-1 flex-col space-y-6 text-gray-200">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 items-end">
                <StyledField name="name" label="Name" errors={errors.name} touched={touched.name} />
                <StyledField type="number" name="closingHour" label="Closing hour" errors={errors.closingHour} touched={touched.closingHour} />
              </div>
              <StyledField as="textarea" name="description" label="Description" errors={errors.description} touched={touched.description} />
            </div>
            <div className="flex flex-col space-y-4">
              <FormSection title="Employees" state={values.employees.length > 0} setState={() => setFieldValue("employees", values.employees?.length > 0 ? [] : employees.map(e => e._id))}>
                <div className="flex flex-col space-y-4 flex-grow rounded">
                  <EmployeeMultiSelector formValues={values.employees} setFieldValue={(e) => setFieldValue('employees', e)} />
                </div>
              </FormSection>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setAddEmployeesOpen(true)}
                type="button"
                className="flex items-center space-x-2 uppercase text-sm text-gray-300 hover:bg-gray-900 px-4 py-1 rounded-lg transition-all font-bold"
              >
                <span>Add employees</span>
                <ExternalLinkIcon className="w-5 h-5" />
              </button>
              {submitButton ? submitButton : <Button content='Add rota' />}
            </div>
          </Form>
        )}
      </Formik>
      <AddEmployeeModal isOpen={addEmployeesOpen} close={() => setAddEmployeesOpen(false)} level={2} />
    </>
  )
}

export default RotaForm;