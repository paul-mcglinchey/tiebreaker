import { AddGroupForm } from '.';
import { Toolbar } from '..';
import { IProps } from '../../models';

const AddGroup = ({ endpoint }: IProps) => {

  return (
    <>
      <Toolbar>Create Group</Toolbar>
      <div className="flex justify-center lg:space-x-4">
        <AddGroupForm endpoint={endpoint} />
      </div>
    </>
  )
}

export default AddGroup;