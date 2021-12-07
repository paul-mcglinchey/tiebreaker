import CreateGroupForm from './CreateGroupForm';
import { UserGroupIcon } from '@heroicons/react/solid';

const CreateGroup = (props) => {

  const { getGroups } = props;

  return (
    <div className="flex lg:flex-row lg:flex-row-reverse flex-col justify-center space-y-4 sm:space-y-8 lg:space-y-0">
      <div className="flex items-center justify-center text-white bg-purple-brand py-2 sm:py-4 my-0 sm:my-4 lg:ml-2 lg:my-0 rounded font-bold xl:font-extrabold text-lg xs:text-xl sm:text-3xl xl:text-5xl lg:pt-10 lg:px-4 lg:max-w-1/2 lg:rounded-xl filter drop-shadow-sm lg:text-right">
        <div className="inline-block">
          Create a group to get started
          <span className="inline-block align-middle">
            <UserGroupIcon className="h-6 w-6 sm:h-8 sm:w-8 xl:h-12 xl:w-12 ml-4 mb-2" />
          </span>
        </div>
      </div>
      <CreateGroupForm getGroups={getGroups} />
    </div>
  )
}

export default CreateGroup;