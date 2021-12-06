import { Fragment, useState } from 'react';
import { MenuIcon, FireIcon, XIcon } from '@heroicons/react/solid';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Userfront from '@userfront/core';
import { Link, useLocation } from 'react-router-dom';
import GroupSelector from './GroupSelector';
import { useMountEffect } from '../helpers/useMountEffect';

// Public functions
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const handleLogout = () => {
  Userfront.logout();
}

const NavMenu = (props) => {

  const { getGroups, userGroup, setUserGroup, groups } = props;
  const location = useLocation();

  const [links, setLinks] = useState([
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Add Clients', href: '/addclients', current: false },
    { name: 'Groups', href: '/groups', current: false }
  ])

  // this is triggered when a user interacts with a navlink
  const handleClick = (name) => {
    let linksCopy = [...links];
    linksCopy.forEach(link => link.current = link.name === name ? true : false);
    setLinks(linksCopy);
  }

  // this is triggered on component mount
  const handleReload = () => {
    let linksCopy = [...links];
    linksCopy.forEach(link => link.current = link.href === location.pathname ? true : false);
    setLinks(linksCopy);
  }

  useMountEffect(handleReload);

  return (
    <div className={`flex flex-col ${Userfront.accessToken() ? "" : "hidden"}`}>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
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
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://res.cloudinary.com/pmcglinchey/image/upload/v1638719678/logo_npttuo.svg"
                      alt="pyrobooks"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://res.cloudinary.com/pmcglinchey/image/upload/v1638645717/wideLogo_oy6aiy.svg"
                      alt="pyrobooks"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {links.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => handleClick(item.name)}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <FireIcon className="w-8 h-auto text-gray-300 hover:text-purple-brand transition-all" />
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(active ? 'bg-gray-100' : '', 'w-full text-left px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(active ? 'bg-gray-100' : '', 'w-full text-left px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleLogout()}
                              className={classNames(active ? 'bg-gray-100' : '', 'w-full text-left px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {links.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleClick(item.name)}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )
        }
      </Disclosure >
      <div className="flex justify-end px-2 sm:px-6 lg:px-8 py-2">
        <GroupSelector
          getGroups={getGroups}
          userGroup={userGroup}
          setUserGroup={setUserGroup}
          groups={groups}
        />
      </div>
    </div>
  )
}

export default NavMenu;