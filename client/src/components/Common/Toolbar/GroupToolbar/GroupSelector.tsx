import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useIsMounted } from "../../../../hooks";
import { IGroup } from "../../../../models";
import { combineClassNames, getItemInStorage, setItemInStorage } from "../../../../services";

interface IGroupSelectorProps {
  group?: IGroup,
  setGroupId: Dispatch<SetStateAction<string>>
  groups: IGroup[] 
}

const GroupSelector = ({ setGroupId, groups }: IGroupSelectorProps) => {

  const isMounted = useIsMounted();
  const storageKey = 'groupId';

  const updateGroup = useCallback((groupId: string | undefined) => {
    if (!groupId) return;

    // Update the group held in storage
    setItemInStorage(storageKey, groupId);

    // Update the group held in state
    isMounted() && setGroupId(groupId);
  }, [isMounted, setGroupId, storageKey])

  const getGroupName = (groupId: string | undefined | null): string | undefined => {
    return groups.filter((g: IGroup) => g._id === groupId)[0]?.name;
  }

  useEffect(() => {
    let storedGroupId = getItemInStorage(storageKey);

    let isStoredGroupValid = groups.filter((g: IGroup) => g._id === storedGroupId).length > 0;

    isMounted() && !isStoredGroupValid && updateGroup(groups[0]?._id)
  }, [groups, isMounted, storageKey, updateGroup]);

  return (  
    <div className="flex flex-grow items-center justify-end">
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button className="inline-flex justify-center items-center w-full rounded-md px-5 md:px-4 py-3 md:py-2 bg-gray-800 hover:text-blue-400 transition-colors text-sm font-medium focus:outline-none focus:text-blue-500">
          <div>
            {getGroupName(getItemInStorage(storageKey)) || 'Groups'}
          </div>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="z-50 origin-top-right absolute right-0 mt-2"
        >
          <Menu.Items className="whitespace-nowrap min-w-60 rounded-md bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <div className="flex px-4 py-2 font-bold justify-between items-center">
                <span>
                  Groups
                </span>
              </div>
              {groups.map((g: IGroup) => (
                <Menu.Item key={g._id}>
                  {({ active }) => (
                    <button
                      onClick={() => updateGroup(g._id)}
                      className={combineClassNames(
                        active ? 'text-gray-400' : '',
                        'block px-4 py-2 text-sm font-medium'
                      )}
                    >
                      {g.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu >
    </div>
  )
}

export default GroupSelector;