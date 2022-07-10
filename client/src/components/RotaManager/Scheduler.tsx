import { useState } from "react";
import { Formik } from "formik";
import { UserAddIcon } from "@heroicons/react/solid";
import { useRotaService, useScheduleService } from "../../hooks";
import { Prompter, SpinnerLoader } from "../Common";
import { RotaHeader, Schedule } from "."
import { IRota } from "../../models";

interface ISchedulerResponse {
  rota: IRota
}

const Scheduler = ({ rota }: ISchedulerResponse) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [currentWeekModifier, setCurrentWeekModifier] = useState<number>(0)

  const { isLoading: isRotaLoading, } = useRotaService()
  const { getSchedule, updateSchedule, createSchedule, getWeek, isLoading: isScheduleLoading } = useScheduleService()

  const currentWeek = getWeek(currentWeekModifier)
  const startDate = currentWeek.firstDay

  const schedule = rota ? getSchedule(startDate, rota, currentWeek.week) : undefined

  return (
    <>
      {rota && schedule && !isRotaLoading && !isScheduleLoading ? (
        <Formik
          enableReinitialize
          initialValues={{
            startDate: schedule.startDate || startDate,
            employeeSchedules: schedule.employeeSchedules.map(es => ({ 
              employeeId: es.employeeId, shifts: es.shifts.map(s => ({ 
                date: s.date, startHour: s.startHour || '', endHour: s.endHour || '', notes: s.notes || '' 
              }))
            }))
          }}
          onSubmit={async (values, actions) => {
            const updatedSchedule = schedule?._id ? await updateSchedule(values, schedule._id, rota._id) : await createSchedule(values, rota._id)
            actions.resetForm({ values: { 
              startDate: updatedSchedule?.startDate || startDate, 
              employeeSchedules: updatedSchedule?.employeeSchedules.map(es => ({
                employeeId: es.employeeId, shifts: es.shifts.map(s => ({
                  date: s.date, startHour: s.startHour || '', endHour: s.endHour || '', notes: s.notes || ''
                }))
              })) || [] 
            }})
          }}
        >
          {() => (
            <div className="flex flex-col">
              <RotaHeader
                rota={rota}
                editing={editing}
                setEditing={setEditing}
              />
              {(rota?.employees?.length || 0) > 0 ? (
                <Schedule
                  editing={editing}
                  currentWeek={currentWeek}
                  currentWeekModifier={currentWeekModifier}
                  setCurrentWeekModifier={setCurrentWeekModifier}
                />
              ) : (
                <Prompter
                  title="This rota doesn't have any employees"
                  subtitle="To get started with the rota manager you'll need to add employees to your group, if you already have your employees created within your group you can simply add them to the rota"
                  action={() => { }}
                  Icon={UserAddIcon}
                />
              )}
            </div>
          )}
        </Formik>
      ) : (
        (isRotaLoading || isScheduleLoading) && (
          <SpinnerLoader />
        )
      )}
    </>
  )
}

export default Scheduler