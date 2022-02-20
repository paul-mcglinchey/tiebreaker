import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Fragment, useContext } from "react";
import { IClientProps } from "../../../models";
import { generateColour, requestBuilder } from "../../../services";
import { ApplicationContext, endpoints, profileColours } from "../../../utilities";

const ColourPicker = ({ client }: IClientProps) => {

  const { setStatus } = useContext(ApplicationContext);

  const setProfileColour = () => {
    const clientColour = generateColour() || "";

    updateProfileColour(clientColour);

    return clientColour;
  }

  const updateProfileColour = async (clientColour: string) => {
    setStatus({
      isLoading: true,
      success: '',
      error: ''
    });

  await fetch((endpoints.colours(client && client._id)), requestBuilder('PUT', { clientColour: clientColour }))
    .then(res => {
      if (res.ok) {
        setStatus({ isLoading: false, success: `Updated client colour`, error: '' });
      } else {
        setStatus({ isLoading: false, success: '', error: `A problem occurred updating the client colour` });
      }
    })
    .catch((err) => {
      setStatus({ isLoading: false, success: '', error: err.message || `A problem occurred updating the client colour` });
    })
  }

  return (
    <div className="inline-flex items-center">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center space-x-2 text-white">
          <ChevronDownIcon className="w-6 h-6" />
          <div style={{ backgroundColor: client.clientColour ? client.clientColour : setProfileColour() }} className="w-8 h-8 rounded"></div>
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
          <Menu.Items className="z-50 origin-top-right right-0 mt-4 absolute flex flex-wrap flex-grow w-60 justify-evenly rounded bg-gray-900 p-2">
            {profileColours.map((pc: string, i: number) => (
              <button
                key={i}
                onClick={() => updateProfileColour(pc)}
                style={{ backgroundColor: pc }} 
                className="w-8 h-8 m-1 rounded hover:opacity-50" 
              />
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default ColourPicker;