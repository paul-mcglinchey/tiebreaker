import { AddGroupForm } from '.';
import { IAddGroupProps } from '../../../models';
import { ClientGroupService } from '../../../services';
import { Toolbar } from '../../Common';

const AddClientGroup = ({ statusService }: IAddGroupProps) => {

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