import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { Fragment } from "react"
import { IListValue } from "../../../models"

interface IListboxSelectorProps {
  label: string
  items: IListValue[]
  selected: IListValue | undefined
  setSelected: (_id: string) => void
}

const ListboxSelector = ({ label, items, selected, setSelected }: IListboxSelectorProps) => {
  return (
    <div className="w-72">
      <Listbox value={selected?._id} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="h-10 relative w-full cursor-default rounded bg-gray-900 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:outline-blue-500 focus-visible:outline-1">
            <span className="block truncate">{selected?.long || label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5">
              {items.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-800 text-blue-500' : 'text-gray-300'}`
                  }
                  value={item._id}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {item.long}
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
    </div>
  )
}

export default ListboxSelector