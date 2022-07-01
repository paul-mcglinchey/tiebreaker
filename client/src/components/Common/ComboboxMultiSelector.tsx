import { Fragment } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { combineClassNames } from "../../services"

interface IComboboxMultiSelectorItem {
  label: string | undefined
  value: string | undefined
}

interface IComboboxMultiSelectorProps {
  label: string
  showLabel?: boolean
  items: IComboboxMultiSelectorItem[]
  selected: IComboboxMultiSelectorItem[]
  setSelected: (values: IComboboxMultiSelectorItem[]) => void
  classes?: string
  selectorClasses?: string
  optionsClasses?: string
}

const ComboboxMultiSelector = ({ items, selected, setSelected, optionsClasses }: IComboboxMultiSelectorProps) => {
  return (
    <Combobox value={selected} onChange={setSelected} multiple>
        <Combobox.Input
          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
          displayValue={(selected: IComboboxMultiSelectorItem[]) => selected.map(item => item.label).join(', ')}
          onChange={() => {}}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <SelectorIcon 
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className={combineClassNames(
            "focus:outline-none absolute origin-top-right z-50 mt-1 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5",
            "bg-gray-200 dark:bg-slate-800",
            optionsClasses
          )}>
            {items.map((item, index) => (
              <Combobox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all 
                  ${active && 'text-blue-500'}`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate font-semibold`}>
                      {item.label} {selected && 'SELECTED'}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
    </Combobox>
  )
}

export default ComboboxMultiSelector