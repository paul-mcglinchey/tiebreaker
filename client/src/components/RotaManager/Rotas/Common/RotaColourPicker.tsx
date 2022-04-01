import { useContext } from "react"
import { IRota, Status } from "../../../../models"
import { generateColour, requestBuilder } from "../../../../services";
import { endpoints, StatusContext } from "../../../../utilities";
import { ColourPicker } from "../../../Common"

const RotaColourPicker = ({ rota }: { rota: IRota }) => {

  const profileColour = rota.colour || generateColour();
  const { status, setStatus } = useContext(StatusContext);

  const updateProfileColour = async (rotaColour: string) => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }]);

    await fetch((endpoints.rota(rota._id || "")), requestBuilder('PUT', undefined, { colour: rotaColour }))
      .then(res => {
        if (res.ok) {
          setStatus([...status, { isLoading: false, message: `Updated rota colour`, type: Status.Success }]);
        } else {
          setStatus([...status, { isLoading: false, message: `A problem occurred updating the rota colour`, type: Status.Error }]);
        }
      })
      .catch((err) => {
        setStatus([...status, { isLoading: false, message: err.message || `A problem occurred updating the rota colour`, type: Status.Error }]);
      })
  }

  return (
    <ColourPicker square={true} colour={profileColour} setColour={updateProfileColour} />
  )
}

export default RotaColourPicker;