import CreateGroupForm from './CreateGroupForm';
import { UserGroupIcon } from '@heroicons/react/solid';

const CreateGroup = (props) => {

  const { getGroups } = props;

  return (
    <div className="flex md:flex-row md:flex-row-reverse flex-col justify-center space-y-4 sm:space-y-8 md:space-y-0">
      <div className="flex text-white bg-purple-brand justify-center font-bold rounded-xl sm:py-4 my-0 py-6 md:ml-4 lg:font-extrabold text-2xl sm:text-3xl lg:text-5xl md:px-4 md:max-w-1/2 shadow-sm text-center md:text-right">
        <div className="inline-block">
          Create a group to get started
          <span className="inline-block align-middle">
            <UserGroupIcon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 ml-2 md:ml-4 mb-2" />
          </span>
        </div>
      </div>
      <CreateGroupForm getGroups={getGroups} />
    </div>
  )
}

export default CreateGroup;