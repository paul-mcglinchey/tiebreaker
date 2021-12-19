import { Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const GroupSelector = (props, children) => {

  const {
    userGroup,
    setUserGroup,
    groups
  } = props;

  const location = useLocation();

  return (
    <Fragment>

      {groups && groups.length !== 0 &&
        <div className="flex items-center justify-end">

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center items-center w-full rounded-md px-4 py-2 bg-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">
              {userGroup ? userGroup : 'Groups'}
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
              <Menu.Items className={`z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none ${groups ? '' : 'hidden'}`}>
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
                  {groups && groups.map((g) => {
                    return (
                      <Menu.Item key={g._id}>
                        {({ active }) => (
                          <button
                            onClick={() => setUserGroup(g.groupname)}
                            className={classNames(
                              active ? 'text-gray-400' : '',
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
        </div>
      }
    </Fragment>
  )
}

export default GroupSelector;