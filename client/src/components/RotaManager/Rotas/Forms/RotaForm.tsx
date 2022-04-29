import { Formik, Form } from 'formik';
import { useState } from 'react';
import { useEmployeeService } from '../../../../hooks';

import { DayOfWeek, IRota } from '../../../../models';
import { rotaValidationSchema } from '../../../../utilities';
import { Button, StyledField, Selector, FormSection, InlineLink } from '../../../Common';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import { EmployeeListSelector } from '../../..';

interface IRotaFormProps {
  rota?: IRota | undefined,
  handleSubmit: (values: IRota) => void,
  submitButton?: JSX.Element;
}

const RotaForm = ({ rota, handleSubmit, submitButton }: IRotaFormProps) => {
  const [startDay, setStartDay] = useState({ value: DayOfWeek.Monday, label: DayOfWeek[DayOfWeek.Monday] });

  const getDaysOfWeekOptions = () => {
    return Object.keys(DayOfWeek).filter((day: any) => isNaN(day)).map((day: string) => {
      return {
        value: DayOfWeek[day as keyof typeof DayOfWeek],
        label: day
      }
    })
  }

  const { getEmployees } = useEmployeeService()
  const employees = getEmployees()

  return (
    <Formik
      initialValues={{
        name: rota?.name || '',
        description: rota?.description || '',
        startDay: rota?.startDay || startDay.value,
        closingHour: rota?.closingHour || 22,
        employees: rota?.employees || [],
        checked: false
      }}
      validationSchema={rotaValidationSchema}
      onSubmit={(values, actions) => {
        handleSubmit({ ...values });
        actions.resetForm();
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="flex flex-1 flex-col space-y-6 text-gray-200">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-4">
              <StyledField name="name" label="Name" errors={errors.name} touched={touched.name} />
              <Selector options={getDaysOfWeekOptions()} option={startDay} setValue={(e) => setStartDay(e)} label="Start Day" />
              <StyledField type="number" name="closingHour" label="Closing hour" errors={errors.closingHour} touched={touched.closingHour} />
            </div>
            <StyledField as="textarea" name="description" label="Description" errors={errors.description} touched={touched.description} />
          </div>
          <div className="flex flex-col space-y-4">
            <FormSection title="Employees" state={values.employees.length > 0} setState={() => setFieldValue("employees", values.employees?.length > 0 ? [] : employees.map(e => e._id))}>
              <div className="flex flex-col space-y-4 flex-grow rounded">
                <EmployeeListSelector employeeIds={getEmployees().filter(e => e._id).map(e => e._id)} formValues={values.employees} setFieldValue={(e) => setFieldValue('employees', e)} />
              </div>
            </FormSection>
          </div>
          <div className="flex justify-between">
            <InlineLink to="/rotas/employees/true">
              <div>Add employees</div>
              <ExternalLinkIcon className="w-5 h-5" />
            </InlineLink>
            {submitButton ? submitButton : <Button content='Add rota' />}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RotaForm;