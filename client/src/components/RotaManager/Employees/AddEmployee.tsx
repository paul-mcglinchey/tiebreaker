import { AddEmployeeForm } from ".";
import { ToolbarType } from "../../../models";
import { Toolbar } from "../../Common";


const AddEmployee = () => {
  return (
    <div>
      <Toolbar toolbarTypes={[ToolbarType.RotaGroups]}>
        Add new employees
      </Toolbar>
      <AddEmployeeForm />
    </div>
  )
}

export default AddEmployee;