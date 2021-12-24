import { Fragment } from "react";
import { Menu } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon, ViewGridAddIcon } from "@heroicons/react/solid";

const options = [
  { name: 'Add session', icon: ViewGridAddIcon, classes: "text-green-500" },
  { name: 'Delete client', icon: TrashIcon, classes: "text-red-500" },
]

const ClientOptions = props => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex justify-center items-center w-full rounded-md px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">
        Options
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
        <Menu.Items className={`z-50 origin-top-right absolute right-0 w-48 rounded-md bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div className="py-1">
            {options.map((o, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <button
                    className={`inline-flex justify-between items-center w-full px-3 py-2 text-sm font-medium ${o.classes}`}
                  >
                    {o.name}
                    <o.icon className="-mr-1 ml-2 w-5 h-5" />
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ClientOptions;
