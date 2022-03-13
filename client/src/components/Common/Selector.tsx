import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import { ISelectorProps } from '../../models/props/selector-props.model';

const Selector = ({ options, option, setValue, label }: ISelectorProps) => {
  return (
    <div className="w-96 flex flex-col">
      <div className="text-gray-500 uppercase font-bold">{label}</div>
      <Menu as="div" className="rounded p-2 relative my-1 bg-gray-800 flex text-gray-200">
        <Menu.Button className="flex justify-between items-center font-semibold tracking-wide w-full text-left">
          {option ? option : label}
          <ChevronDownIcon className="w-6 h-6" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-y-75"
          enterTo="transform opacity-100 scale-y-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-y-100"
          leaveTo="transform opacity-0 scale-y-75"
        >
          <Menu.Items className="z-50 origin-top-right absolute left-0 top-full mt-2 flex flex-col bg-gray-800 rounded shadow-md w-full">
            {options.length > 0 ? options.map((o, i) => (
              <Menu.Item key={i}>
                <button
                  type="button"
                  className="flex p-2 text-gray-400 hover:text-gray-200 tracking-wide rounded font-bold"
                  onClick={() => setValue(o)}
                >
                  {o}
                </button>
              </Menu.Item>
            )) : (
              <div className="flex p-2 text-gray-400 tracking-wide rounded font-bold">
                No options found
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Selector;