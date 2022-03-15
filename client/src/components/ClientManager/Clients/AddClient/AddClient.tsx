import { AddClientForm } from ".";
import { Toolbar } from "../../..";
import { ToolbarType } from "../../../../models";


const AddClient = () => {
  return (
    <div>
      <Toolbar toolbarType={ToolbarType.Groups}>
        Add new clients
      </Toolbar>
      <AddClientForm />
    </div>
  )
}

export default AddClient;