import { Fragment, useState } from "react";
import {
  useParams
} from "react-router";
import { Fetch } from "../../..";
import { useFetch, useGroupService, useRequestBuilder, useRotaService } from "../../../../hooks";
import { IFetch, IScheduleResponse } from "../../../../models";
import { endpoints } from "../../../../utilities";
import { RotaHeader, Schedule } from "..";
import { Formik } from "formik";

const RotaPage = () => {

  const rotaId = useParams()["rotaId"] || ""
  const { requestBuilder } = useRequestBuilder()
  const { groupId } = useGroupService()

  const { getWeek, updateSchedule, dependency } = useRotaService()

  const [editing, setEditing] = useState<boolean>(false)
  const [currentWeekModifier, setCurrentWeekModifier] = useState<number>(0)

  const currentWeek = getWeek(currentWeekModifier)
  const startDate = currentWeek.firstDay.toISOString().split('T')[0] || ""

  return (
    <Fetch
      fetchOutput={useFetch(
        `${endpoints.schedule(rotaId, groupId, startDate)}`,
        requestBuilder(), [dependency, currentWeekModifier], false)
      }
      render={({ response, isLoading }: IFetch<IScheduleResponse>) => (
        <Fragment>
          {!isLoading && response && response.rota && (
            <div className="flex flex-col">
              <Formik
                initialValues={response.schedule}
                onSubmit={(values, { resetForm }) => {
                  resetForm({ values: response.schedule });
                  updateSchedule(values, rotaId, groupId);
                }}
              >
                {({ handleSubmit, values, dirty }) => (
                  <>
                    <RotaHeader
                      handleSubmit={handleSubmit}
                      dirty={dirty}
                      rota={response.rota}
                      editing={editing}
                      setEditing={setEditing}
                    />
                    <Schedule
                      handleSubmit={handleSubmit}
                      values={values}
                      dirty={dirty}
                      editing={editing}
                      currentWeek={currentWeek}
                      currentWeekModifier={currentWeekModifier}
                      setCurrentWeekModifier={setCurrentWeekModifier}
                    />
                  </>
                )}
              </Formik>
            </div>
          )}
        </Fragment>
      )}
    />
  )
}

export default RotaPage;