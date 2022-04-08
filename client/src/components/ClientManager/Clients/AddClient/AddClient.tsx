import { useContext } from "react";
import { ClientForm } from "../../..";
import { GroupType } from "../../../../models";
import { ApplicationContext } from "../../../../utilities";
import { GroupToolbar } from "../../../Toolbar";

const AddClient = () => {

  const { setClientGroup } = useContext(ApplicationContext);

  return (
    <div>
      <GroupToolbar title="Add client" groupType={GroupType.CLIENT} showSelector setGroup={setClientGroup} />
      <ClientForm />
    </div>
  )
}

export default AddClient;