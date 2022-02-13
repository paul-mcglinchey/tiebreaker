import { AddClientForm } from ".";
import { Toolbar } from "../..";


const AddNewClient = ({ userGroup, setUserGroup, status, setStatus }) => {

  return (
    <div>
      <Toolbar userGroup={userGroup} setUserGroup={setUserGroup} status={status}>
        Add new clients
      </Toolbar>
      <AddClientForm userGroup={userGroup} status={status} setStatus={setStatus} />
    </div>
  )
}

export default AddNewClient;