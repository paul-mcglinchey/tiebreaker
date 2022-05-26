import { useCallback, useEffect } from "react";
import { useGroupService } from "../../hooks";
import { IGroup } from "../../models";
import { getItemInLocalStorage, setItemInLocalStorage } from "../../services";
import { ListboxSelector } from ".";

const GroupSelector = () => {
  const { getGroups, getGroup, updateGroupId } = useGroupService()
  const group: IGroup | undefined = getGroup(getItemInLocalStorage('group-id')) || getGroups()[0]

  const updateGroup = useCallback((groupId: string) => {
    setItemInLocalStorage('group-id', groupId);
    updateGroupId(groupId);
  }, [updateGroupId])

  useEffect(() => {
    group && group._id && updateGroup(group?._id)
  }, [group, updateGroup])

  return (
    <div className="flex flex-grow items-center justify-end">
      <ListboxSelector
        label="Groups"
        items={getGroups().map(g => ({ value: g._id, label: g.name }))} 
        selected={{ value: group?._id, label: group?.name }} 
        setSelected={(groupId) => updateGroup(groupId)}
        selectorClasses="bg-transparent shadow-none group"
        optionsClasses="text-gray-800 dark:text-gray-200"
      />
    </div>
  )
}

export default GroupSelector