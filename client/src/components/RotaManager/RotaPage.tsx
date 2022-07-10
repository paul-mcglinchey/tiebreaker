import { useParams } from "react-router";
import { useRotaService } from "../../hooks";
import { ScheduleProvider } from "../../contexts";
import { Scheduler } from ".";

const RotaPage = () => {

  const { rotaId } = useParams()
  const { getRota } = useRotaService()

  const rota = getRota(rotaId)

  return (
    <>
      {rota && rota._id ? (
        <ScheduleProvider rotaId={rota._id} >
          <Scheduler rota={rota} />
        </ScheduleProvider >
      ) : (
        <>
        </>
      )}
    </>
  )
}

export default RotaPage;