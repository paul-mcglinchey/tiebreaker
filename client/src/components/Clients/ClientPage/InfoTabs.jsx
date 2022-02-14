import { Tab } from "@headlessui/react";
import { classNames } from "../../../utilities";
import { infoTabs } from "./Common/tabs.config";

const InfoTabs = ({ client }) => {

  return (
    <div className="flex flex-grow flex-col max-w-md px-2 py-5">
      <Tab.Group>
        <Tab.List className="flex space-x-4 rounded-lg">
          {infoTabs.map((l, i) => (
            <Tab
              key={i}
              className={({ selected }) => classNames(
                "w-full flex-grow whitespace-nowrap py-1 px-2 text-sm leading-5 font-medium text-green-500 rounded-lg",
                "focus:outline-none focus:ring-0 ring-offset-blue-400 ring-white ring-opacity-60",
                selected
                  ? "bg-gray-800 shadow"
                  : "text-gray-100 hover:bg-white/[0.12] hover:text-white"
              )}
            >
              {l.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {infoTabs.map((t, i) => (
            <Tab.Panel
              key={i}
              className={classNames(
                'bg-gray-800 rounded-lg p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              {t.component ? (
                <t.component client={client} />
              ) : (
                <div>404</div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default InfoTabs;