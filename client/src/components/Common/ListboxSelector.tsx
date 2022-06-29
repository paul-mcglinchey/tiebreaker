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
  selectorClasses?: string
  optionsClasses?: string
}

const ListboxSelector = ({ label, items, selected, setSelected, selectorClasses, optionsClasses }: IListboxSelectorProps) => {
  return (
    <Listbox value={selected?.value} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className={combineClassNames(
          "h-10 w-full py-2 pl-3 pr-10 text-left rounded-lg focus:outline-none focus-visible:outline-blue-500 focus-visible:outline-1",
          selectorClasses
        )}>
          <span className="block truncate">{selected?.label || label}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 dark:group-hover:text-blue-500 group-hover:text-blue-900 transition-colors"
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
            "focus:outline-none absolute origin-top-right z-50 mt-1 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5",
            "bg-gray-200 dark:bg-gray-900",
            optionsClasses
          )}>
            {items.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all 
                  ${active && 'text-blue-500'}`
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