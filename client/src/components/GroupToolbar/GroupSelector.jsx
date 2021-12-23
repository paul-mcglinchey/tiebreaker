import { Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';
import { endpoints, requestHelper, useFetch } from '../../utilities';
import { Fetch } from '..';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const GroupSelector = ({ userGroup, updateUserGroup }) => {

  const location = useLocation();

  const getUserInStorage = () => {
    try {
      return JSON.parse(sessionStorage.getItem("userGroup"));
    } catch {
      return null;
    }
  }

  return (
    <div className="flex flex-grow items-center justify-end">
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button className="inline-flex justify-center items-center w-full rounded-md px-5 md:px-4 py-3 md:py-2 bg-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">
          <Fetch
            fetchOutput={useFetch(`${endpoints.groups}?id=${getUserInStorage() && getUserInStorage()._id}`, requestHelper.requestBuilder("GET"))}
            render={({ response }) => (
              <div>
                {response.groups && response.groups.length > 0 && updateUserGroup(response.groups[0])}
                {userGroup ? userGroup.groupname : 'Groups'}
              </div>
            )}
          />
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>

        <Transition
          as={Fragment}
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
                <Link
                  to={{
                    pathname: "/creategroup",
                    state: { from: location }
                  }}
                >
                  <PlusIcon className="h-6 w-6 hover:text-gray-400" />
                </Link>
              </div>
              <Fetch
                fetchOutput={useFetch(endpoints.groups, requestHelper.requestBuilder("GET"))}
                render={({ response, isLoading }) => {
                  return (
                    response && response.groups && response.groups.map(g => (
                      <Menu.Item key={g._id}>
                        {({ active }) => (
                          <button
                            onClick={() => updateUserGroup(g)}
                            className={classNames(
                              active ? 'text-gray-400' : '',
                              'block px-4 py-2 text-sm font-medium'
                            )}
                          >
                            {g.groupname}
                          </button>
                        )}
                      </Menu.Item>
                    ))
                  )
                }}
              />
            </div>
          </Menu.Items>
        </Transition>

      </Menu >
    </div>

  )
}

export default GroupSelector;