import { Formik, Form } from 'formik';
import { useContext, useState } from 'react';
import { useFetch } from '../../../../hooks';

import { DayOfWeek, IEmployee, IEmployeesResponse, IFetch, IRota } from '../../../../models';
import { requestBuilder } from '../../../../services';
import { ApplicationContext, endpoints, rotaValidationSchema } from '../../../../utilities';
import { Button, StyledField, SpinnerIcon, Selector, Fetch, FormSection, InlineLink } from '../../../Common';
import { StaffSelector } from '.';
import { ExternalLinkIcon } from '@heroicons/react/solid';

interface IRotaFormProps {
  rota?: IRota | undefined,
  handleSubmit: (values: IRota) => void,
  submitButton?: JSX.Element;
}

const RotaForm = ({ rota, handleSubmit, submitButton }: IRotaFormProps) => {

  const { groupId } = useContext(ApplicationContext);

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
        fetchOutput={useFetch(endpoints.employees(groupId), requestBuilder(), [groupId])}
        render={({ response, isLoading }: IFetch<IEmployeesResponse>) => (
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
            onSubmit={(values, actions) => {
              handleSubmit({ ...values });
              actions.resetForm();
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="flex flex-1 flex-col space-y-6 text-gray-200">
                <div className="flex flex-col space-y-3">
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
                <div className="flex justify-between">
                  <InlineLink to="/rotas/employees/true">
                    <div>
                      Add employees
                    </div>
                    <ExternalLinkIcon className="w-5 h-5" />
                  </InlineLink>
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