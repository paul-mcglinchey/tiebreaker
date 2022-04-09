import { Formik, Form } from 'formik';
import { useContext, useState } from 'react';
import { useFetch, useStatus } from '../../../hooks';

import { DayOfWeek, IEmployee, IEmployeeResponse, IFetch, IRota } from '../../../models';
import { EmployeeService, requestBuilder } from '../../../services';
import { ApplicationContext, endpoints, rotaValidationSchema } from '../../../utilities';
import { Button, StyledField, SpinnerIcon, Selector, Fetch, FormSection } from '../../Common';
import { CompactEmployeeForm } from '../Employees/Forms';
import { StaffSelector } from './Forms';

interface IRotaFormProps {
  rota?: IRota | undefined,
  handleSubmit: (values: IRota) => void,
  submitButton?: JSX.Element;
}

const RotaForm = ({ rota, handleSubmit, submitButton }: IRotaFormProps) => {

  const { rotaGroup } = useContext(ApplicationContext);
  const { statusService } = useStatus()
  const employeeService = new EmployeeService(statusService);

  const [startDay, setStartDay] = useState({ value: DayOfWeek.Monday, label: DayOfWeek[DayOfWeek.Monday] });

  const getDaysOfWeekOptions = () => {
    return Object.keys(DayOfWeek).filter((day: any) => isNaN(day)).map((day: string) => {
      return {
        value: DayOfWeek[day as keyof typeof DayOfWeek],
        label: day
      }
    })
  }

  return (
    <>
      <Fetch
        fetchOutput={useFetch(endpoints.employees(rotaGroup && rotaGroup._id || ''), requestBuilder())}
        render={({ response, isLoading }: IFetch<IEmployeeResponse>) => (
          <Formik
            initialValues={{
              name: rota?.name || '',
              description: rota?.description || '',
              startDay: rota?.startDay || startDay.value,
              closingHour: rota?.closingHour || 22,
              employeeIds: rota?.employeeIds || [],
              checked: false
            }}
            validationSchema={rotaValidationSchema}
            onSubmit={(values) => {
              handleSubmit({ ...values });
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="flex flex-1 flex-col space-y-8 text-gray-200">
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-4">
                    <StyledField name="name" label="Name" errors={errors.name} touched={touched.name} />
                    <Selector options={getDaysOfWeekOptions()} option={startDay} setValue={(e) => setStartDay(e)} label="Start Day" />
                    <StyledField type="number" name="closingHour" label="Closing hour" errors={errors.closingHour} touched={touched.closingHour} />
                  </div>
                  <StyledField as="textarea" name="description" label="Description" errors={errors.description} touched={touched.description} />
                </div>
                <div className="flex flex-col space-y-4">
                  {response ? (
                    <FormSection title="Employees" state={values.employeeIds.length > 0} setState={() => setFieldValue("employeeIds", values.employeeIds?.length > 0 ? [] : response.employees.map((e: IEmployee) => e._id))}>
                      <div className="flex flex-col space-y-4 flex-grow rounded">
                        {response && response.count > 0 && (
                          <StaffSelector
                            name="employeeIds"
                            items={response.employees}
                            formValues={values.employeeIds || []}
                            setFieldValue={setFieldValue}
                          />
                        )}
                        <div className="flex">
                          <CompactEmployeeForm employeeService={employeeService} groupId={rotaGroup._id || ""} />
                        </div>
                      </div>
                    </FormSection>
                  ) : (
                    isLoading && (
                      <div>
                        <SpinnerIcon className="w-6 h-6" />
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-end">
                  {submitButton ? submitButton : <Button content='Add rota' />}
                </div>
              </Form>
            )}
          </Formik>
        )}
      />
    </>
  )
}

export default RotaForm;