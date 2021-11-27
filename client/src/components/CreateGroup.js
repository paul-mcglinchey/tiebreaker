import CreateGroupButton from './CreateGroupButton';
import CreateGroupForm from './CreateGroupForm';

const CreateGroup = (props) => {

  return (
    <div className="flex flex-grow justify-center mt-10 mb-10">
      {!props.formVisible ?
        <div className="flex flex-col text-center space-y-4">
          <span className="text-green-500 font-medium text-xl">It looks like you don't belong to any groups yet</span>
          <CreateGroupButton setFormVisible={props.setFormVisible} setNewClientActive={props.setNewClientActive} className="px-3 py-2 border-2 border-green-500 rounded-xl font-medium text-gray-500 hover:bg-green-500 hover:text-white transition-all" />
        </div>
        :
        <CreateGroupForm setGroups={props.setGroups} />
      }

    </div>
  )
}

export default CreateGroup;