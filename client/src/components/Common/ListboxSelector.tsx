import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { combineClassNames } from "../../services"

interface IListboxSelectorItem {
  label: string | undefined
  value: string | undefined
}

interface IListboxSelectorProps {
  label: string
  items: IListboxSelectorItem[]
  selected: IListboxSelectorItem | undefined
  setSelected: (value: string) => void
  className?: string
}

const ListboxSelector = ({ label, items, selected, setSelected, className }: IListboxSelectorProps) => {
  return (
    <Listbox value={selected?.value} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className={combineClassNames(
          "h-10 relative w-max py-2 pl-3 pr-10 text-left rounded-lg shadow-md focus:outline-none focus-visible:outline-blue-500 focus-visible:outline-1",
          className || "bg-gray-800"
        )}>
          <span className="block truncate">{selected?.label || label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className={combineClassNames(
            "focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5",
            className || "bg-gray-800"
          )}>
            {items.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 transition-all 
                  ${active ? 'bg-gray-900 text-blue-500' : 'text-gray-300'}`
                }
                value={item.value}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {item.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default ListboxSelector