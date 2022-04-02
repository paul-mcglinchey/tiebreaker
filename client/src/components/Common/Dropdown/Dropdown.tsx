import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { combineClassNames } from "../../../services";

interface IOption {
  label: string,
  action?: () => void,
  Icon?: any,
  iconColour?: string
}

interface IDropdownProps {
  label?: string
  options?: IOption[]
}

const Dropdown = ({ label = "Options", options = [] }: IDropdownProps) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left text-white w-full">
        <Menu.Button className="inline-flex justify-center items-center w-full rounded-md px-5 md:px-4 py-3 md:py-2 bg-gray-800 hover:text-blue-400 transition-colors text-sm font-medium focus:outline-none focus:text-blue-500">
          <div>
            {label}
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
          <Menu.Items className="z-50 flex flex-col origin-top-right absolute right-0 mt-2 rounded-md bg-gray-800 shadow-md focus:outline-none">
            {options.map((o: IOption, key: number) => (
              <Menu.Item key={key}>
                {({ active }) => (
                  <button
                    onClick={() => o.action ? o.action() : {}}
                    className={combineClassNames(
                      active ? 'text-blue-400' : '',
                      'block px-4 py-2 text-base font-medium flex justify-between items-center space-x-8 whitespace-nowrap'
                    )}
                  >
                    <span>
                      {o.label}
                    </span>
                    <span>
                      {o.Icon && (<o.Icon className={`w-4 h-4 ${o.iconColour}`} />)}
                    </span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu >
    </>
  )
}

export default Dropdown;