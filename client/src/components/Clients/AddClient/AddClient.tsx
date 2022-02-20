import { useContext } from "react";
import { AddClientForm } from ".";
import { Toolbar } from "../..";
import { ApplicationContext } from "../../../utilities/contexts";


const AddNewClient = () => {

  const { userGroup, setUserGroup, status, setStatus } = useContext(ApplicationContext);

  return (
    <div>
      <Toolbar userGroup={userGroup} setUserGroup={setUserGroup} status={status}>
        Add new clients
      </Toolbar>
      <AddClientForm userGroup={userGroup} setUserGroup={setUserGroup} status={status} setStatus={setStatus} />
    </div>
  )
}

export default AddNewClient;