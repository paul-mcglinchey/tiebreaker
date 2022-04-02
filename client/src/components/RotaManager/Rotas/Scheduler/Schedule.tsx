import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { ScheduleTable } from "../../..";
import { IRota } from "../../../../models";
import { IRotaService } from "../../../../services";
import { SquareIconButton } from "../../../Common";

interface IScheduleProps {
  rota: IRota, 
  rotaService: IRotaService
}

const Schedule = ({ rota, rotaService }: IScheduleProps) => {

  const [currentWeekModifier, setCurrentWeekModifier] = useState<number>(0);
  const currentWeek = rotaService.getWeek(currentWeekModifier);
  const cycleBack = () => setCurrentWeekModifier(currentWeekModifier - 1);
  const cycleForwards = () => setCurrentWeekModifier(currentWeekModifier + 1);

  return (
    <div className="flex flex-col space-y-4 mt-4 text-gray-200">
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <SquareIconButton Icon={ChevronLeftIcon} action={() => cycleBack()} />
            <div>
              {currentWeek.firstDay.toLocaleDateString()}
            </div>
          </div>
          <div>
            {currentWeekModifier === 0 ? 'Current week' : (
              currentWeekModifier > 0
                ? currentWeekModifier === 1 ? 'Next week' : currentWeekModifier + ' weeks away'
                : currentWeekModifier === -1 ? 'Last week' : Math.abs(currentWeekModifier) + ' weeks ago'
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div>
              {currentWeek.lastDay.toLocaleDateString()}
            </div>
            <SquareIconButton Icon={ChevronRightIcon} action={() => cycleForwards()} />
          </div>
        </div>
        <ScheduleTable
          rota={rota}
          currentWeek={currentWeek}
          currentWeekModifier={currentWeekModifier}
          rotaService={rotaService}
        />
      </div>
    </div>
  )
}

export default Schedule;