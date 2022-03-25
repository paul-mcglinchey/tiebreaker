import { useStatus } from "../../../hooks";
import { RotaGroupService } from "../../../services";
import { Toolbar } from "../../Common";
import { AddGroupForm } from "./Common";

const AddRotaGroup = () => {

  const { statusService } = useStatus();

  return (
    <>
      <Toolbar>Create Rota Group</Toolbar>
      <div className="flex justify-center lg:space-x-4">
        <AddGroupForm groupService={new RotaGroupService(statusService)} />
      </div>
    </>
  )
}

export default AddRotaGroup;