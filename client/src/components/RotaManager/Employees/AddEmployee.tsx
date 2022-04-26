import { GroupToolbar } from "../../Common";
import { FullEmployeeForm } from "./Forms";

const AddEmployee = () => {
  return (
    <div>
      <GroupToolbar title="Add employee" showSelector />
      <FullEmployeeForm />
    </div>
  )
}

export default AddEmployee;