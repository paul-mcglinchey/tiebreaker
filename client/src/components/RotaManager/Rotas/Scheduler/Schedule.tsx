import { useState } from "react";
import { ScheduleTable } from "../../..";
import { IRota } from "../../../../models";
import { IRotaService } from "../../../../services";
import { ScheduleSwitcher } from "./Common";

interface IScheduleProps {
  rota: IRota,
  rotaService: IRotaService,
  editing: boolean
}

const Schedule = ({ rota, rotaService, editing }: IScheduleProps) => {

  const [currentWeekModifier, setCurrentWeekModifier] = useState<number>(0);
  const currentWeek = rotaService.getWeek(currentWeekModifier);
  const cycleBack = () => setCurrentWeekModifier(currentWeekModifier - 1);
  const cycleForwards = () => setCurrentWeekModifier(currentWeekModifier + 1);

  return (
    <div className="flex flex-col flex-grow space-y-4 mt-10 text-gray-200">
      <ScheduleSwitcher
        backwards={cycleBack}
        forwards={cycleForwards}
        startDate={currentWeek.firstDay}
        endDate={currentWeek.lastDay}
        modifier={currentWeekModifier}
      />
      <ScheduleTable
        rota={rota}
        currentWeek={currentWeek}
        currentWeekModifier={currentWeekModifier}
        rotaService={rotaService}
        editing={editing}
      />
    </div>
  )
}

export default Schedule;