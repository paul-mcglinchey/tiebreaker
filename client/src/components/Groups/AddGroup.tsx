import { UserGroupIcon } from '@heroicons/react/solid';

import { AddGroupForm } from '.';
import { Toolbar } from '..';

const AddGroup = () => {

  return (
    <>
      <Toolbar>Create Group</Toolbar>
      <div className="flex justify-center lg:space-x-4">
        <AddGroupForm />
        <div className="hidden lg:flex text-white bg-blue-600 font-extrabold lg:text-5xl px-4 max-w-1/2 shadow-sm text-center md:text-right rounded pt-4">
          <div className="inline-block">
            Create a group to get started
            <span className="inline-block align-middle">
              <UserGroupIcon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 ml-2 md:ml-4 mb-2" />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddGroup;