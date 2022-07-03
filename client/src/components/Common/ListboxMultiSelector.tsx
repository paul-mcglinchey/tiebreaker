import { useEffect, useState } from "react"
import { Listbox } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { combineClassNames } from "../../services"
import { FadeInOut } from "./Transitions"
import { IChildrenProps } from "../../models"

interface IListboxMultiSelectorProps<T> {
  label: string
  showLabel?: boolean
  items: T[]
  initialState: T[]
  labelFieldName: string
  classes?: string
  selectorClasses?: string
  optionsClasses?: string
  onUpdate?: (values: T[]) => void
}

const ListboxMultiSelector = <T,>({ label, showLabel = false, items, initialState, labelFieldName, classes, selectorClasses, optionsClasses, onUpdate = () => { } }: IListboxMultiSelectorProps<T>) => {

  const [selected, setSelected] = useState<T[]>(initialState)

  useEffect(() => {
    onUpdate(selected)
  }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected} multiple>
      <div className={combineClassNames("relative col-span-1", classes)}>
        {showLabel && <label className="block font-bold text-sm text-gray-500 mb-1 uppercase">{label}</label>}
        <ListboxButton classes={selectorClasses}>
          {selected.length > 0
            ? selected?.map(s => s[labelFieldName as keyof T]).join(', ')
            : label
          }
        </ListboxButton>
        <FadeInOut>
          <ListboxOptions classes={optionsClasses}>
            {items.map((item, i) =>
              <ListboxOption key={i} value={item}>
                {item[labelFieldName as keyof T]}
              </ListboxOption>
            )}
          </ListboxOptions>
        </FadeInOut>
      </div>
    </Listbox>
  )
}

interface IListboxButtonProps {
  classes?: string | undefined
}

const ListboxButton = ({ classes, children }: IListboxButtonProps & IChildrenProps) => {
  return (
    <Listbox.Button className={combineClassNames(
      "h-10 w-full relative py-2 pl-3 pr-10 text-left rounded bg-gray-900 focus:outline-none focus-visible:outline-blue-500 focus-visible:outline-1",
      classes
    )}>
      <span className="block truncate tracking-wider">
        {children}
      </span>
      <span className="absolute inset-y-0 right-0 flex items-center pr-2">
        <SelectorIcon
          className="h-5 w-5 dark:group-hover:text-blue-500 group-hover:text-blue-900 transition-colors"
          aria-hidden="true"
        />
      </span>
    </Listbox.Button>
  )
}

interface IListboxOptionsProps {
  classes?: string | undefined
}

const ListboxOptions = ({ classes, children }: IListboxOptionsProps & IChildrenProps) => {
  return (
    <Listbox.Options className={combineClassNames(
      "w-full focus:outline-none absolute origin-top-right z-50 mt-1 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5",
      "bg-gray-200 dark:bg-slate-800",
      classes
    )}>
      {children}
    </Listbox.Options>
  )
}

interface IListboxOptionProps {
  classes?: string
  value: any
}

const ListboxOption = ({ classes, value, children }: IListboxOptionProps & IChildrenProps) => {
  return (
    <Listbox.Option
      className={({ active }) => combineClassNames(
`relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all 
        ${active && 'text-blue-500'}`, classes
      )}
      value={value}
    >
      {({ selected }) => (
        <>
          <span className={`block truncate font-semibold`}>
            {children}
          </span>
          {selected && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </>
      )}
    </Listbox.Option>
  )
}

export default ListboxMultiSelector