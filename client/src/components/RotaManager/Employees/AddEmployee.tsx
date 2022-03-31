import { useContext } from "react";
import { AddEmployeeForm } from ".";
import { ToolbarType } from "../../../models";
import { ApplicationContext } from "../../../utilities";
import { Toolbar } from "../../Common";
import { GroupPrompter } from "../../Groups";

const AddEmployee = () => {

  const { rotaGroup } = useContext(ApplicationContext);

  return (
    <div>
      {rotaGroup ? (
        <>
          <Toolbar toolbarTypes={[ToolbarType.RotaGroups]}>
            Add new employees
          </Toolbar>
          <AddEmployeeForm />
        </>
      ) : (
        <GroupPrompter href="/rotas/creategroup" />
      )}
    </div>
  )
}

export default AddEmployee;