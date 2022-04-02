import { useFetch } from "../../../../hooks";
import { ButtonType, DayOfWeek, IEmployee, IFetch, IRota, IScheduleResponse } from "../../../../models";
import { IRotaService, requestBuilder } from "../../../../services";
import { endpoints } from "../../../../utilities";
import { Button, Fetch } from "../../../Common";
import EmployeeRow from "./EmployeeRow";

interface IScheduleTableProps {
  rota: IRota,
  currentWeek: { firstDay: Date, lastDay: Date },
  currentWeekModifier: number,
  rotaService: IRotaService
}

const ScheduleTable = ({ rota, currentWeek, currentWeekModifier, rotaService }: IScheduleTableProps) => {

  const dayCycle: number[] = [1, 2, 3, 4, 5, 6, 0];

  return (
    <>
      <Fetch
        fetchOutput={useFetch(endpoints.schedules(rota._id || "", currentWeek.firstDay), requestBuilder("GET"), [currentWeekModifier])}
        render={({ response }: IFetch<IScheduleResponse>) => (
          <>
            {response && response.schedule ? (
              <div className="relative shadow overflow-x-scroll md:overflow-x-auto rounded-md">
                <table className="min-w-full border border-blue-500">
                  <thead>
                    <tr>
                      <th></th>
                      {dayCycle.map((day: number) => (
                        <th 
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-400 uppercase" 
                          key={day}
                        >
                          {DayOfWeek[day]}
                        </th>
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
                    {rota.employees?.map((employee: IEmployee, key: number) => (
                      <EmployeeRow key={key} employee={employee} schedule={response.schedule} dayCycle={dayCycle} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <Button buttonType={ButtonType.Primary} content="Press this button to create a new schedule for this week" action={() => rotaService.addSchedule(rota, currentWeek.firstDay)} />
              </div>
            )}
          </>
        )}
      />
    </>
  )
}

export default ScheduleTable;