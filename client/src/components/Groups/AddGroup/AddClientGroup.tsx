import { AddGroupForm } from '.';
import { useStatus } from '../../../hooks';
import { ClientGroupService } from '../../../services';
import { Toolbar } from '../../Common';

const AddClientGroup = () => {

  const { statusService } = useStatus();

  return (
    <>
      <Toolbar>Create Group</Toolbar>
      <div className="flex justify-center lg:space-x-4">
        <AddGroupForm groupService={new ClientGroupService(statusService)} />
      </div>
    </>
  )
}

export default AddClientGroup;