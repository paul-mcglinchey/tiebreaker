import { Fragment, useState } from "react";
import {
  useParams
} from "react-router";
import { Fetch } from "../../..";
import { useFetch, useRefresh, useStatus } from "../../../../hooks";
import { IFetch, IScheduleResponse } from "../../../../models";
import { requestBuilder, RotaService } from "../../../../services";
import { endpoints } from "../../../../utilities";
import { RotaHeader, Schedule } from "..";
import { Formik } from "formik";

const RotaPage = () => {

  const { dependency, refresh } = useRefresh();
  const { statusService } = useStatus();
  const rotaService = new RotaService(statusService, refresh);

  const { rotaId } = useParams();

  const [editing, setEditing] = useState<boolean>(false);
  const [currentWeekModifier, setCurrentWeekModifier] = useState<number>(0);
  const currentWeek = rotaService.getWeek(currentWeekModifier);

  return (
    <Fetch
      fetchOutput={useFetch(
        `${endpoints.schedule(rotaId || "", currentWeek.firstDay.toISOString().split('T')[0] || "")}`,
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
                  rotaService.updateSchedule(rotaId, values);
                }}
              >
                {({ handleSubmit, values, touched }) => (
                  <>
                    <RotaHeader 
                      handleSubmit={handleSubmit} 
                      rota={response.rota} 
                      rotaService={rotaService} 
                      editing={editing} 
                      setEditing={setEditing} 
                    />
                    <Schedule 
                      handleSubmit={handleSubmit}
                      values={values}
                      touched={touched}
                      rota={response.rota}
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