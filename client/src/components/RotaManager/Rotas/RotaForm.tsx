import { Formik, Form } from 'formik';
import { useContext, useState } from 'react';
import { useFetch } from '../../../hooks';

import { ButtonType, DayOfWeek, IEmployee, IEmployeeResponse, IFetch, IRota } from '../../../models';
import { requestBuilder } from '../../../services';
import { ApplicationContext, endpoints, rotaValidationSchema } from '../../../utilities';
import { Button, StyledField, SpinnerIcon, Selector, Fetch, FormSection } from '../../Common';
import { AddEmployeeModal } from '../Employees';
import { StaffSelector } from './Forms';

interface IRotaFormProps {
  rota?: IRota | undefined,
  handleSubmit: (values: IRota) => void,
  canAddEmployees?: boolean
}

const RotaForm = ({ rota, handleSubmit, canAddEmployees = false }: IRotaFormProps) => {

  const { rotaGroup } = useContext(ApplicationContext);

  const [startDay, setStartDay] = useState({ value: DayOfWeek.Monday, label: DayOfWeek[DayOfWeek.Monday] });

  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const toggleAddEmployeeOpen = () => setAddEmployeeOpen(!addEmployeeOpen);

  const getDaysOfWeekOptions = () => {
    return Object.keys(DayOfWeek).filter((day: any) => isNaN(day)).map((day: string) => {
      return {
        value: DayOfWeek[day as keyof typeof DayOfWeek],
        label: day
      }
    })
  }

  const [employeeIds, setEmployeeIds] = useState<string[]>(rota?.employeeIds || []);
  const toggleAllEmployees = (count: number, ids: string[]) => {
    employeeIds.length === count
      ? setEmployeeIds([])
      : setEmployeeIds(ids)
  }

  return (
    <>
      <Fetch
        fetchOutput={useFetch(endpoints.employees(rotaGroup._id || ""), requestBuilder())}
        render={({ response, isLoading }: IFetch<IEmployeeResponse>) => (
          <Formik
            initialValues={rota || {
              name: '',
              description: '',
              startDay: startDay.value,
              closingHour: 22,
              employeeIds: [],
            }}
            validationSchema={rotaValidationSchema}
            onSubmit={(values) => {
              console.log(values);
              handleSubmit({ ...values, employeeIds: employeeIds });
            }}
          >
            {({ errors, touched }) => (
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
                    <FormSection title="Employees" state={employeeIds.length === response.count} setState={() => toggleAllEmployees(response.count, response.employees.map((e: IEmployee) => e._id || ""))}>
                      <div className="flex flex-col space-y-4 flex-grow rounded">
                        {response.count > 0 && (
                          <StaffSelector employees={response.employees} employeeIds={employeeIds} setEmployeeIds={setEmployeeIds} />
                        )}
                        {canAddEmployees && (
                          <div className='flex justify-end'>
                            <Button content='Add employees' buttonType={ButtonType.Tertiary} type="button" action={() => toggleAddEmployeeOpen()} />
                          </div>
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
                <div className="flex justify-end">
                  <Button content='Add rota' />
                </div>
              </Form>
            )}
          </Formik>
        )}
      />
      <AddEmployeeModal modalOpen={addEmployeeOpen} toggleModalOpen={toggleAddEmployeeOpen} groupId={rotaGroup._id || ""} />
    </>
  )
}

export default RotaForm;