import { Dispatch, SetStateAction } from "react";
import { ISchedule } from "../../../../models";
import { ScheduleTable, ScheduleSwitcher } from "..";
import { FormikContextType, useFormikContext } from "formik";

interface IScheduleProps {
  currentWeek: { firstDay: Date, lastDay: Date },
  editing: boolean
  currentWeekModifier: number
  setCurrentWeekModifier: Dispatch<SetStateAction<number>>
}

const Schedule = ({ currentWeek, editing, currentWeekModifier, setCurrentWeekModifier }: IScheduleProps) => {

  const { dirty, handleSubmit }: FormikContextType<ISchedule> = useFormikContext()

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
        editing={editing}
      />
    </div>
  )
}

export default Schedule;