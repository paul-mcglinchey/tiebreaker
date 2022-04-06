import { useContext } from "react";
import { GroupType } from "../../../models";
import { ApplicationContext } from "../../../utilities";
import { GroupToolbar } from "../../Toolbar";
import { FullEmployeeForm } from "./Forms";

const AddEmployee = () => {

  const { rotaGroup, setRotaGroup } = useContext(ApplicationContext);

  return (
    <div>
      <GroupToolbar title="Add employee" groupType={GroupType.ROTA} showSelector group={rotaGroup} setGroup={setRotaGroup} />
      <FullEmployeeForm />
    </div>
  )
}

export default AddEmployee;