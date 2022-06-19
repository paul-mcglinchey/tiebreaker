import { useEffect } from "react";
import { useGroupService } from "../../hooks";
import { setItemInLocalStorage } from "../../services";
import { ListboxSelector } from ".";

const GroupSelector = () => {
  const { groups, getGroup, currentGroup, setCurrentGroup } = useGroupService()

  const updateGroup = (groupId: string) => {
    setItemInLocalStorage('group-id', groupId);
    setCurrentGroup(getGroup(groupId));
  }

  useEffect(() => {
    currentGroup && currentGroup._id && updateGroup(currentGroup?._id)
  }, [currentGroup, updateGroup])

  return (
    <div className="flex flex-grow items-center justify-end">
      <ListboxSelector
        label="Groups"
        items={groups.map(g => ({ value: g._id, label: g.name }))} 
        selected={{ value: currentGroup?._id, label: currentGroup?.name }} 
        setSelected={(groupId) => updateGroup(groupId)}
        selectorClasses="bg-transparent shadow-none group"
        optionsClasses="text-gray-800 dark:text-gray-200"
      />
    </div>
  )
}

export default GroupSelector