import { Dispatch, SetStateAction } from "react";
import { ScheduleTable } from "../../..";
import { IRota, ISchedule } from "../../../../models";
import { ScheduleSwitcher } from "./Common";

interface IScheduleProps {
  handleSubmit: () => void
  rota: IRota,
  currentWeek: { firstDay: Date, lastDay: Date },
  touched: any
  values: ISchedule
  editing: boolean
  currentWeekModifier: number
  setCurrentWeekModifier: Dispatch<SetStateAction<number>>
}

const Schedule = ({ handleSubmit, rota, currentWeek, values, touched, editing, currentWeekModifier, setCurrentWeekModifier }: IScheduleProps) => {

  const cycleBack = () => updateScheduleWeek(currentWeekModifier - 1);
  const cycleForwards = () => updateScheduleWeek(currentWeekModifier + 1);

  const updateScheduleWeek = (modifier: number) => {
    console.log(touched)
    handleSubmit();
    setCurrentWeekModifier(modifier);
  }

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
        values={values}
        editing={editing}
      />
    </div>
  )
}

export default Schedule;