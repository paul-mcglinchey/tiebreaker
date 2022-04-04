import { useContext } from "react"
import { IClient } from "../../../../models"
import { ClientService, generateColour, StatusService } from "../../../../services";
import { StatusContext } from "../../../../utilities";
import { ColourPicker } from "../../../Common"

const ClientColourPicker = ({ client }: { client: IClient }) => {

  const profileColour = client.clientColour || generateColour();
  const { status, setStatus } = useContext(StatusContext);
  const clientService = new ClientService(new StatusService(status, setStatus));

  return (
    <ColourPicker square={true} colour={profileColour} setColour={(colour: string) => clientService.updateClient({ ...client, clientColour: colour }, client._id || "")} />
  )
}

export default ClientColourPicker;