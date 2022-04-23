import { Dispatch, SetStateAction } from "react";
import { ScheduleTable } from "../../..";
import { ISchedule } from "../../../../models";
import { ScheduleSwitcher } from "./Common";

interface IScheduleProps {
  handleSubmit: () => void
  currentWeek: { firstDay: Date, lastDay: Date },
  dirty: boolean
  values: ISchedule
  editing: boolean
  currentWeekModifier: number
  setCurrentWeekModifier: Dispatch<SetStateAction<number>>
}

const Schedule = ({ handleSubmit, currentWeek, values, dirty, editing, currentWeekModifier, setCurrentWeekModifier }: IScheduleProps) => {

  const cycleBack = () => updateScheduleWeek(currentWeekModifier - 1);
  const cycleForwards = () => updateScheduleWeek(currentWeekModifier + 1);

  const updateScheduleWeek = (modifier: number) => {
    dirty && handleSubmit();
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
        currentWeek={currentWeek}
        values={values}
        editing={editing}
      />
    </div>
  )
}

export default Schedule;