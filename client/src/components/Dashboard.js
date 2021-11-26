import { Transition } from '@headlessui/react';
import { useState } from 'react';
import AddNewButton from './AddNewButton';
import AddNewClient from './AddNewClient';
import ClientList from './ClientList';
import Userfront from "@userfront/core";

const Dashboard = (props) => {

  const [newClientActive, setNewClientActive] = useState(false);
  const toggleNewClientActive = () => setNewClientActive(!newClientActive);

  const handleLogout = () => {
    Userfront.logout();
  }

  return (
    <div className="font-sans subpixel-antialiased md:pt-5 bg-gradient-to-b from-blue-500 via-green-500">
      <div className="md:container mx-auto md:rounded-xl p-2 bg-white filter md:drop-shadow-lg">
        <div className="flex justify-between items-end mb-4">
          <div className="bg-clip-text bg-gradient-to-r from-blue-500 to-green-500bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 text-transparent text-5xl font-extrabold">
            <h1>ClientSplash</h1>
          </div>
          <div className="flex space-x-2">
            <div className="flex space-x-2">
              <AddNewButton toggleNewClientActive={() => toggleNewClientActive()} newClientActive={newClientActive} />
            </div>
            <button
              onClick={() => handleLogout()}
              className="px-2 border border-purple-300 rounded-md text-sm font-medium text-purple-500 px-2 py-2 shadow-sm bg-white hover:text-white hover:bg-purple-500 transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
        <Transition
          show={!newClientActive}
          enter="transition ease-out duration-75"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <ClientList />
        </Transition>
        <Transition
          show={newClientActive}
          enter="transition ease-out duration-150"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <AddNewClient />
        </Transition>
      </div>
    </div>
  )
}

export default Dashboard;