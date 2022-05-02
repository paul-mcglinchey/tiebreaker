import { UserAddIcon } from "@heroicons/react/solid";
import { Formik } from "formik";
import { useState } from "react";
import { RotaHeader, Schedule } from ".."
import { useRotaService, useScheduleService } from "../../../../hooks";
import { Prompter } from "../../../Common";

const Scheduler = ({ rotaId }: { rotaId: string | undefined }) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [currentWeekModifier, setCurrentWeekModifier] = useState<number>(0)

  const { getRota } = useRotaService()
  const { getSchedule, updateSchedule, createSchedule, getWeek, isLoading } = useScheduleService()

  const currentWeek = getWeek(currentWeekModifier)
  const startDate = currentWeek.firstDay.toISOString().split('T')[0] || ""

  const rota = getRota(rotaId)

  return (
    <>
      {!isLoading && rota && (
        <Formik
          enableReinitialize
          initialValues={getSchedule(new Date(startDate), rota)}
          onSubmit={(values) => {
            values._id ? updateSchedule(values, rotaId, values._id) : createSchedule(values, rotaId)
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
      )}
    </>
  )
}

export default Scheduler