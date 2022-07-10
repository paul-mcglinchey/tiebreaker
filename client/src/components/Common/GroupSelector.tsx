
import { useGroupService } from "../../hooks";
import { ListboxSelector } from ".";
import { IGroup } from "../../models";

const GroupSelector = () => {
  const { groups = [], currentGroup, setCurrentGroup } = useGroupService()

  return (
    <div className="flex flex-grow items-center justify-end min-w-">
      <ListboxSelector<IGroup>
        label="Groups"
        items={groups} 
        initialSelected={currentGroup}
        labelFieldName="name"
        buttonClasses="bg-transparent shadow-none group"
        optionsClasses="min-w-max text-gray-800 dark:text-gray-200"
        onUpdate={(group) => setCurrentGroup(group)}
      />
    </div>
  )
}

export default GroupSelector