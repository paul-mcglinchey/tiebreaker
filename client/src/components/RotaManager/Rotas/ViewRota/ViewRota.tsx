import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { EmployeeRow } from "../../..";
import { useFetch } from "../../../../hooks";
import { ButtonType, DayOfWeek, IEmployee, IFetch, IRota, IScheduleResponse } from "../../../../models";
import { IRotaService, requestBuilder } from "../../../../services";
import { endpoints } from "../../../../utilities";
import { Button, Fetch, SquareIconButton } from "../../../Common";
const ViewRota = ({ rota, rotaService }: { rota: IRota, rotaService: IRotaService }) => {

  const [currentWeekModifier, setCurrentWeekModifier] = useState<number>(0);
  const currentWeek = rotaService.getWeek(currentWeekModifier);
  const dayCycle: number[] = [1, 2, 3, 4, 5, 6, 0];
  const cycleBack = () => setCurrentWeekModifier(currentWeekModifier - 1);
  const cycleForwards = () => setCurrentWeekModifier(currentWeekModifier + 1);

  return (
    <div className="flex flex-col space-y-4 text-gray-200">
      <div>
        <h1 className="pt-4 text-4xl font-semibold tracking-wider">View rota</h1>
      </div>
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <SquareIconButton Icon={ArrowLeftIcon} action={() => cycleBack()} />
            {currentWeek.firstDay.toLocaleDateString()}
          </div>
          <div>
            {currentWeekModifier === 0 ? 'Current week' : (
              currentWeekModifier > 0
                ? currentWeekModifier === 1 ? 'Next week' : currentWeekModifier + ' weeks away'
                : currentWeekModifier === -1 ? 'Last week' : Math.abs(currentWeekModifier) + ' weeks ago'
            )}
          </div>
          <div className="flex items-center">
            {currentWeek.lastDay.toLocaleDateString()}
            <SquareIconButton Icon={ArrowRightIcon} action={() => cycleForwards()} />
          </div>
        </div>
        <Fetch
          fetchOutput={useFetch(endpoints.schedules(rota._id || "", currentWeek.firstDay), requestBuilder("GET"), [currentWeekModifier])}
          render={({ response }: IFetch<IScheduleResponse>) => (
            response && response.schedule ? (
              <div className="relative shadow overflow-x-scroll md:overflow-x-auto rounded-md">
                {console.log(response)}
                <table className="min-w-full border border-blue-500">
                  <thead>
                    <tr>
                      <th></th>
                      {dayCycle.map((day: number) => (
                        <th key={day}>{DayOfWeek[day]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
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
            )
          )}
        />
      </div>
    </div>
  )
}

export default ViewRota;