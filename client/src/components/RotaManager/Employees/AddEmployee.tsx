import { useContext } from "react";
import { ApplicationContext } from "../../../utilities";
import { GroupToolbar } from "../../Common";
import { FullEmployeeForm } from "./Forms";

const AddEmployee = () => {

  const { setGroupId } = useContext(ApplicationContext);

  return (
    <div>
      <GroupToolbar title="Add employee" showSelector setGroupId={setGroupId} />
      <FullEmployeeForm />
    </div>
  )
}

export default AddEmployee;