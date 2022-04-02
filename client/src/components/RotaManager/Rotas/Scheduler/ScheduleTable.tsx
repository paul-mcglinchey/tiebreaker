import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../../../hooks";
import { ButtonType, DayOfWeek, IEmployeeSchedule, IFetch, IRota, ISchedule, IScheduleResponse } from "../../../../models";
import { IRotaService, requestBuilder } from "../../../../services";
import { endpoints } from "../../../../utilities";
import { Button } from "../../../Common";
import EmployeeRow from "./EmployeeRow";

interface IScheduleTableProps {
  rota: IRota,
  currentWeek: { firstDay: Date, lastDay: Date },
  currentWeekModifier: number,
  rotaService: IRotaService
}

const ScheduleTable = ({ rota, currentWeek, currentWeekModifier, rotaService }: IScheduleTableProps) => {

  const dayCycle: number[] = [0, 1, 2, 3, 4, 5, 6];
  const [schedule, setSchedule] = useState<ISchedule>({} as ISchedule);
  const componentIsMounted = useRef(true);

  const { response }: IFetch<IScheduleResponse> = useFetch(
    endpoints.schedules.get(rota._id || "", currentWeek.firstDay.toISOString().split('T')[0] || ""),
    requestBuilder("GET"), [currentWeekModifier]
  );

  useEffect(() => {
    componentIsMounted && response && setSchedule(response.schedule);

    return () => {
      componentIsMounted.current = false;
    }
  }, [response])

  return (
    <>
      {schedule.employeeSchedules && (
        <div className="relative shadow overflow-x-scroll md:overflow-x-auto rounded-md">
          <table className="min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th>
                  <Button buttonType={ButtonType.Secondary} content='Save' action={() => rotaService.updateSchedule(rota, schedule)} />
                </th>
                {dayCycle.map((day: number) => (
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
              {schedule.employeeSchedules.map((employeeSchedule: IEmployeeSchedule, key: number) => (
                <EmployeeRow key={key} employeeSchedule={employeeSchedule} schedule={schedule} setSchedule={setSchedule} dayCycle={dayCycle} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default ScheduleTable;