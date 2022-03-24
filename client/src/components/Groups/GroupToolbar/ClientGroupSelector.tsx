import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';
import { IClientGroup, IGroupsResponse } from '../../../models';
import { combineClassNames, getItemInStorage, requestBuilder } from '../../../services';
import { ApplicationContext, endpoints } from '../../../utilities';

const ClientGroupSelector = () => {

  const { clientGroup, setClientGroup } = useContext(ApplicationContext);
  const componentIsMounted = useRef(true);
  const [groups, setGroups] = useState<IClientGroup[]>([]);
  const storageKey = "clientGroup";

  const storageHasValidGroup = (groups: IClientGroup[]): boolean => {
    return groups.filter((g: IClientGroup) => g.groupName === getItemInStorage(storageKey).groupName).length > 0;
  }

  const updateGroup = (clientGroup: IClientGroup) => {
    // Update the group held in storage
    sessionStorage.setItem(storageKey, JSON.stringify(clientGroup))

    // Update the group held in state
    setClientGroup(clientGroup);
  }

  useEffect(() => {
    const _fetch = async () => {
      fetch(endpoints.groups("client").groups, requestBuilder("GET"))
        .then(res => res.json())
        .then((json: IGroupsResponse<IClientGroup>) => {
          if (componentIsMounted) setGroups(json.groups);
        })
        .then(() => {
          console.log(groups);
          if (componentIsMounted && !storageHasValidGroup(groups)) {
            updateGroup(storageHasValidGroup(groups) ? getItemInStorage(storageKey) : groups[0])
          }
        })
    }

    componentIsMounted 
      && _fetch();

    return () => {
      componentIsMounted.current = false;
    }
  }, []);

  return (
    <div className="flex flex-grow items-center justify-end">
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button className="inline-flex justify-center items-center w-full rounded-md px-5 md:px-4 py-3 md:py-2 bg-gray-800 hover:text-blue-400 transition-colors text-sm font-medium focus:outline-none focus:text-blue-500">
          <div>
            {clientGroup ? clientGroup.groupName : 'Groups'}
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
        >
          <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <div className="flex px-4 py-2 font-bold justify-between items-center">
                <span>
                  Groups
                </span>
                <Link to={{ pathname: "/creategroup" }}>
                  <PlusIcon className="h-6 w-6 hover:text-gray-400" />
                </Link>
              </div>
              {groups.map((g: IClientGroup) => (
                <Menu.Item key={g._id}>
                  {({ active }) => (
                    <button
                      onClick={() => updateGroup(g)}
                      className={combineClassNames(
                        active ? 'text-gray-400' : '',
                        'block px-4 py-2 text-sm font-medium'
                      )}
                    >
                      {g.groupName}
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

export default ClientGroupSelector;