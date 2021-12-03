import { Fragment } from 'react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/solid';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import NavLink from './NavLink';

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Add Clients', href: '/addclients', current: false },
  { name: 'Groups', href: '/groups', current: false }
]

const NavMenu = (props) => {

  const {
    groups, getGroups, setGroups, userGroup, setUserGroup,
    setNewClientActive, toggleFormVisible, toggleNewClientActive, newClientActive, setFormVisible
  } = props;

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink key={item.name} link={item.href} title={item.name} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <button>
                  <span className="sr-only">View Notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default NavMenu;