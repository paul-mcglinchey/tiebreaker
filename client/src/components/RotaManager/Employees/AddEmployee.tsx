import { AddEmployeeForm } from ".";
import { ToolbarType } from "../../../models";
import { Toolbar } from "../../Common";


const AddEmployee = () => {
  return (
    <div>
      <Toolbar toolbarType={ToolbarType.Rotas}>
        Add new employees
      </Toolbar>
      <AddEmployeeForm />
    </div>
  )
}

export default AddEmployee;