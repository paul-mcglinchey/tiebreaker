import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { combineClassNames } from "../../services";
import { colours } from "../../config";

interface IColourPickerProps {
  colour: string,
  setColour: (colour: string) => void,
  menuSide?: "LEFT" | "RIGHT",
  hideIcon?: boolean,
  square?: boolean
}

const ColourPicker = ({ colour, setColour, menuSide, hideIcon, square }: IColourPickerProps) => {

  return (
    <div className="inline-flex items-center">
      <Menu as="div" className="relative w-full">
        <Menu.Button className="flex w-full items-center space-x-2">
          {!hideIcon && (
            <ChevronDownIcon className="w-6 h-6" />
          )}
          <div style={{ backgroundColor: colour }} className={`${square ? 'w-8' : 'w-full'} h-8 rounded`}></div>
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
          <Menu.Items
            className={combineClassNames(menuSide ? (
              menuSide === "LEFT" ? "left-0" : "right-0"
              ) : "right-0",
              "z-50 origin-top-right mt-4 absolute flex flex-wrap flex-grow w-60 justify-evenly rounded bg-white dark:bg-gray-900 p-2 shadow-md"
            )}
          >
            {colours.map((pc: string, i: number) => (
              <Menu.Item
                key={i}
              >
                <button
                  type="button"
                  style={{ backgroundColor: pc }}
                  className="w-8 h-8 m-1 rounded hover:opacity-50"
                  onClick={() => setColour(pc)}
                />
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default ColourPicker;