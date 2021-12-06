import CreateGroupForm from './CreateGroupForm';

const CreateGroup = (props) => {

  const { getGroups } = props;

  return (
    <div className="flex flex-col mt-10 mb-10 items-center space-y-8">
      <div className="text-center space-y-4 text-white bg-purple-brand p-6 rounded-lg font-extrabold text-3xl">
        It looks like you don't belong to any groups yet, create one
      </div>
      <div>
        <CreateGroupForm getGroups={getGroups} />
      </div>
    </div>
  )
}

export default CreateGroup;