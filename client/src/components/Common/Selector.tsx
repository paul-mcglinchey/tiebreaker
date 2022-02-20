import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ISelectorProps } from '../../models/props/selector-props.model';

const Selector = ({ options, option, setValue }: ISelectorProps) => {
  return (
    <Menu as="div" className="flex relative my-2">
      <Menu.Button className="font-semibold tracking-wide">
        {option ? option.label : 'Filter'}
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
        <Menu.Items className="z-50 origin-top-right absolute -right-2 top-full mt-2 flex flex-col bg-gray-700 rounded-lg shadow-md w-32">
          {options.map((o, i) => (
            <button
              key={i}
              className="flex p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-900 tracking-wide font-bold rounded-lg"
              onClick={() => setValue(o)}
            >
              {o.label}
            </button>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Selector;