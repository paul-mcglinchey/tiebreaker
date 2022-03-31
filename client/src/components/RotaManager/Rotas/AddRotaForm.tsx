import { Formik, Form } from 'formik';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks';

import { IAddRota, IEmployee, IEmployeeResponse, IFetch } from '../../../models';
import { Status } from '../../../models/types/status.type';
import { requestBuilder } from '../../../services';
import { endpoints, rotaValidationSchema, StatusContext } from '../../../utilities';
import { CustomDate, Button, StyledField } from '../../Common';
import { Fetch } from '../../Common/Fetch';

const AddRotaForm = () => {

  const { status, setStatus } = useContext(StatusContext);

  const addRota = (values: IAddRota) => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }])

    fetch(endpoints.rotas, requestBuilder('POST', undefined, values))
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

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.employees, requestBuilder())}
      render={({ response }: IFetch<IEmployeeResponse>) => (
        <Formik
          initialValues={{
            startDate: new Date().toISOString().split("T")[0] || "1970-01-01",
            endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toISOString().split("T")[0] || "1970-01-08",
            employees: [],
          }}
          validationSchema={rotaValidationSchema}
          onSubmit={(values) => {
            addRota(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-1 flex-col space-y-8">
              <div className="flex flex-col md:flex-row space-x-4">
                <StyledField type="date" name="startDate" label="Start date" component={CustomDate} errors={errors.startDate} touched={touched.startDate} />
                <StyledField type="date" name="endDate" label="End Date" component={CustomDate} errors={errors.endDate} touched={touched.endDate} />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="text-gray-200 text-lg font-semibold tracking-wider">Employees</div>
                <div className="bg-gray-800 flex flex-grow p-2 py-4 rounded">
                  {response && (
                    response.count > 0 ? (
                      response.employees.map((e: IEmployee, i: number) => (
                        <div key={i}>{e.name.firstName} {e.name.lastName}</div>
                      ))
                    ) : (
                      <div className="text-gray-200 text-sm flex-1 self-center">
                        No employees found, add your employees <Link className="text-blue-300" to="/rotas/addemployee">here</Link>
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