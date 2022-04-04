import { ClientForm, Toolbar } from "../../..";
import { ToolbarType } from "../../../../models";


const AddClient = () => {
  return (
    <div>
      <Toolbar toolbarTypes={[ToolbarType.ClientGroups]}>
        Add new clients
      </Toolbar>
      <ClientForm />
    </div>
  )
}

export default AddClient;