import { Form, Formik } from "formik";
import { Fragment } from "react";
import { useFetch } from "../../../../hooks";
import { ButtonType, DayOfWeek, IEmployeeSchedule, IFetch, IRota, IScheduleResponse } from "../../../../models";
import { IRotaService, requestBuilder } from "../../../../services";
import { endpoints } from "../../../../utilities";
import { Button, Fetch } from "../../../Common";
import EmployeeRow from "./EmployeeRow";

interface IScheduleTableProps {
  rota: IRota,
  currentWeek: { firstDay: Date, lastDay: Date },
  currentWeekModifier: number,
  rotaService: IRotaService,
  editing: boolean
}

const ScheduleTable = ({ rota, currentWeek, currentWeekModifier, rotaService, editing }: IScheduleTableProps) => {

  const dayCycle: number[] = [0, 1, 2, 3, 4, 5, 6];

  return (
    <Fetch
      fetchOutput={useFetch(
        endpoints.schedule(rota._id || "", currentWeek.firstDay.toISOString().split('T')[0] || ""),
        requestBuilder("GET"), [currentWeekModifier]
      )}
      render={({ response, isLoading }: IFetch<IScheduleResponse>) => (
        <>
          {response && !isLoading && response.schedule.employeeSchedules && (
            <div className="relative shadow overflow-x-scroll md:overflow-x-auto rounded-md">
              <Formik
                initialValues={response.schedule}
                onSubmit={(values, { resetForm }) => {
                  resetForm({ values: response.schedule });
                  rotaService.updateSchedule(rota, values);
                }}
              >
                {({ values }) => (
                  <Form>
                    <table className="min-w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6">
                            <Button buttonType={ButtonType.Secondary} content='Save' type="submit" />
                          </th>
                          {dayCycle.map((day: number, index: number) => (
                            <Fragment key={index}>
                              <th
                                scope="col"
                                className="py-3 px-6 text-xs font-medium tracking-wider text-gray-400 uppercase"
                                key={day}
                              >
                                <div className="flex justify-center space-x-2 items-center">
                                  <span>
                                    {DayOfWeek[day]}
                                  </span>
                                  <span className="text-white text-sm">
                                    {new Date(currentWeek.firstDay.getFullYear(), currentWeek.firstDay.getMonth(), currentWeek.firstDay.getDate() + day).getDate()}
                                  </span>
                                </div>
                              </th>
                              <th></th>
                            </Fragment>
                          ))}
                          <th
                            scope="col"
                            className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-400 uppercase"
                          >
                            Total hours
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {values.employeeSchedules.map((employeeSchedule: IEmployeeSchedule, index: number) => (
                          <EmployeeRow key={index} employeeIndex={index} employeeSchedule={employeeSchedule} values={values} dayCycle={dayCycle} editing={editing} />
                        ))}
                      </tbody>
                    </table>
                  </Form>
                )}

              </Formik>
            </div>
          )}
        </>
      )}
    />
  )
}

export default ScheduleTable;