import { useContext } from "react"
import { IClientProps, Status } from "../../../../models"
import { generateColour, requestBuilder } from "../../../../services";
import { endpoints, StatusContext } from "../../../../utilities";
import { ColourPicker } from "../../../Common"

const ClientColourPicker = ({ client }: IClientProps) => {

  const profileColour = client.clientColour || generateColour();
  const { status, setStatus } = useContext(StatusContext);

  const updateProfileColour = async (clientColour: string) => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }]);

    await fetch((endpoints.clientcolours(client && client._id)), requestBuilder('PUT', undefined, { clientColour: clientColour }))
      .then(res => {
        if (res.ok) {
          setStatus([...status, { isLoading: false, message: `Updated client colour`, type: Status.Success }]);
        } else {
          setStatus([...status, { isLoading: false, message: `A problem occurred updating the client colour`, type: Status.Error }]);
        }
      })
      .catch((err) => {
        setStatus([...status, { isLoading: false, message: err.message || `A problem occurred updating the client colour`, type: Status.Error }]);
      })
  }

  return (
    <ColourPicker square={true} colour={profileColour} setColour={updateProfileColour} />
  )
}

export default ClientColourPicker;