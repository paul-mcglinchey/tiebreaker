import { Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const GroupSelector = (props) => {

  const {
    userGroup,
    setUserGroup,
    groups
  } = props;

  const location = useLocation();

  return (
    <Fragment>

      {groups && groups.length !== 0 &&
        <Fragment>
          <Link
            to={{
              pathname: "/creategroup",
              state: { from: location }
            }}
            className="flex items-center h-10 bg-purple-brand rounded-lg mr-2 transform hover:scale-105"
          >
            <PlusIcon className="h-8 px-1 text-white" />
          </Link>
          <Menu as="div" className="relative inline-block text-left h-10">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-purple-brand border-2 border-purple-brand text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                {userGroup ? userGroup : 'Groups'}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className={`z-50 origin-top-right absolute right-0 mt-2 w-full rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${groups ? '' : 'hidden'}`}>
                <div className="py-1">
                  {groups && groups.map((g) => {
                    return (
                      <Menu.Item key={g._id}>
                        {({ active }) => (
                          <button
                            onClick={() => setUserGroup(g.groupname)}
                            className={classNames(
                              active ? 'text-purple-brand' : 'text-gray-600',
                              'block px-4 py-2 text-sm font-medium'
                            )}
                          >
                            {g.groupname}
                          </button>
                        )}
                      </Menu.Item>
                    )
                  })}
                </div>
              </Menu.Items>
            </Transition>

          </Menu >
        </Fragment>
      }
    </Fragment>
  )
}

export default GroupSelector;