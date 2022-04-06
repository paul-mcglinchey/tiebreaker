import { useContext } from "react";
import { ClientForm } from "../../..";
import { GroupType } from "../../../../models";
import { ApplicationContext } from "../../../../utilities";
import { GroupToolbar } from "../../../Toolbar";

const AddClient = () => {

  const { clientGroup, setClientGroup } = useContext(ApplicationContext);

  return (
    <div>
      <GroupToolbar title="Add client" groupType={GroupType.CLIENT} showSelector group={clientGroup} setGroup={setClientGroup} />
      <ClientForm />
    </div>
  )
}

export default AddClient;