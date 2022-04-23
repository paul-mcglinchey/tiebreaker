import { useContext } from "react";
import { GroupType } from "../../../models";
import { ApplicationContext } from "../../../utilities";
import { GroupToolbar } from "../../Toolbar";
import { FullEmployeeForm } from "./Forms";

const AddEmployee = () => {

  const { setGroupId } = useContext(ApplicationContext);

  return (
    <div>
      <GroupToolbar title="Add employee" groupType={GroupType.ROTA} showSelector setGroupId={setGroupId} />
      <FullEmployeeForm />
    </div>
  )
}

export default AddEmployee;