
import { useGroupService } from "../../hooks";
import { ListboxSelector } from ".";

const GroupSelector = () => {
  const { groups, getGroup, currentGroup, setCurrentGroup } = useGroupService()

  return (
    <div className="flex flex-grow items-center justify-end">
      <ListboxSelector
        label="Groups"
        items={groups.map(g => ({ value: g._id, label: g.name }))} 
        selected={{ value: currentGroup?._id, label: currentGroup?.name }} 
        setSelected={(groupId) => setCurrentGroup(getGroup(groupId))}
        selectorClasses="bg-transparent shadow-none group"
        optionsClasses="text-gray-800 dark:text-gray-200"
      />
    </div>
  )
}

export default GroupSelector