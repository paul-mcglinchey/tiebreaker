import { useEffect } from "react";
import { useParams } from "react-router";
import { Scheduler } from "..";
import { useRotaService } from "../../../../hooks";
import { ScheduleProvider } from "../../../../utilities";

const RotaPage = () => {

  const { rotaId } = useParams()
  const { updateRotaId } = useRotaService()
  
  useEffect(() => {
    updateRotaId(rotaId)
  }, [rotaId, updateRotaId])

  return (
    <ScheduleProvider>
      <Scheduler rotaId={rotaId} />
    </ScheduleProvider>
  )
}

export default RotaPage;