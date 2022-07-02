import { Fragment, useEffect, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { combineClassNames } from "../../services"
import { IPermission } from "../../models"
import { usePermissionService } from "../../hooks"

interface IListboxMultiSelectorProps {
  label: string
  showLabel?: boolean
  classes?: string
  selectorClasses?: string
  optionsClasses?: string
  selectedPermissions: string[]
  onChange: (values: IPermission[]) => void
}

const ListboxMultiSelector = ({ label, showLabel = false, classes, selectorClasses, optionsClasses, selectedPermissions, onChange }: IListboxMultiSelectorProps) => {
  
  const { permissions } = usePermissionService()
  const [selected, setSelected] = useState<IPermission[]>(permissions.filter(p => p.identifier && selectedPermissions.includes(p.identifier?.toString())))

  useEffect(() => {
    onChange(selected)

    console.log(selected)
  }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected} multiple>
      <div className={combineClassNames("relative", classes)}>
        {showLabel && <label className="block font-bold text-sm text-gray-500 mb-1 uppercase">{label}</label>}
        <Listbox.Button className={combineClassNames(
          "h-10 w-full relative py-2 pl-3 pr-10 text-left rounded focus:outline-none focus-visible:outline-blue-500 focus-visible:outline-1",
          selectorClasses
        )}>
          <span className="block truncate font-semibold tracking-wider">{selected?.map(s => s.name).join(', ')}</span>
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
            "bg-gray-200 dark:bg-slate-800",
            optionsClasses
          )}>
            {permissions.map((p, i) => (
              <Listbox.Option
                key={i}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all 
                  ${active && 'text-blue-500'}`
                }
                value={p}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate font-semibold`}>
                      {p.name}
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

export default ListboxMultiSelector