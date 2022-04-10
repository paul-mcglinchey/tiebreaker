import { useContext } from "react";
import { ClientForm } from "../../..";
import { GroupType } from "../../../../models";
import { ApplicationContext } from "../../../../utilities";
import { GroupToolbar } from "../../../Toolbar";

const AddClient = () => {

  const { setGroupId } = useContext(ApplicationContext);

  return (
    <div>
      <GroupToolbar title="Add client" groupType={GroupType.CLIENT} showSelector setGroupId={setGroupId} />
      <ClientForm />
    </div>
  )
}

export default AddClient;