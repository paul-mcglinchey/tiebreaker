import { Formik, Form } from 'formik';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks';

import { DayOfWeek, IEmployee, IEmployeeResponse, IFetch, IRota } from '../../../models';
import { Status } from '../../../models/types/status.type';
import { requestBuilder } from '../../../services';
import { ApplicationContext, endpoints, rotaValidationSchema, StatusContext } from '../../../utilities';
import { Button, StyledField, SpinnerIcon, Selector } from '../../Common';
import { Fetch } from '../../Common/Fetch';

const AddRotaForm = () => {

  const { status, setStatus } = useContext(StatusContext);
  const { rotaGroup } = useContext(ApplicationContext);

  const [startDay, setStartDay] = useState({ value: DayOfWeek.Monday, label: DayOfWeek[DayOfWeek.Monday] });

  const addRota = (values: IRota) => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }])

    fetch(endpoints.rotas(), requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          setStatus([...status, { isLoading: false, message: `Successfully added rota`, type: Status.Success }])
        } else {
          setStatus([...status, { isLoading: false, message: `A problem occurred adding rota`, type: Status.Error }])
        }
      })
      .catch(() => {
        setStatus([...status, { isLoading: false, message: `A problem occurred adding the rota`, type: Status.Error }])
      })
  }

  const getDaysOfWeekOptions = () => {
    return Object.keys(DayOfWeek).filter((day: any) => isNaN(day)).map((day: string) => {
      return {
        value: DayOfWeek[day as keyof typeof DayOfWeek],
        label: day
      }
    })
  }

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.employees(rotaGroup._id), requestBuilder())}
      render={({ response, isLoading }: IFetch<IEmployeeResponse>) => (
        <Formik
          initialValues={{
            name: '',
            description: '',
            startDay: startDay.value,
            employees: [],
          }}
          validationSchema={rotaValidationSchema}
          onSubmit={(values) => {
            addRota(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-1 flex-col space-y-8 text-gray-200">
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <StyledField name="name" label="Name" errors={errors.name} touched={touched.name} />
                  <Selector options={getDaysOfWeekOptions()} option={startDay} setValue={(e) => setStartDay(e)} label="Start Day" />
                </div>
                <StyledField name="description" label="Description" errors={errors.description} touched={touched.description} />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="text-gray-200 text-lg font-semibold tracking-wider">Employees</div>
                <div className="bg-gray-800 flex flex-grow p-2 py-4 rounded">
                  {response ? (
                    response.count > 0 ? (
                      response.employees.map((e: IEmployee, i: number) => (
                        <div key={i}>{e.name.firstName} {e.name.lastName}</div>
                      ))
                    ) : (
                      <div className="text-gray-200 text-sm flex-1 self-center">
                        No employees found, add your employees <Link className="text-blue-300" to="/rotas/addemployee">here</Link>
                      </div>
                    )
                  ) : (
                    isLoading && (
                      <div>
                        <SpinnerIcon className="w-6 h-6" />
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <Button status={status} content='Add rota' />
              </div>
            </Form>
          )}
        </Formik>
      )}
    />
  )
}

export default AddRotaForm;