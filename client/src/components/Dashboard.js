import { React } from 'react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import AddNewButton from './AddNewButton';
import AddNewClient from './AddNewClient';
import ClientList from './ClientList';
import Userfront from "@userfront/core";
import CreateGroup from './CreateGroup';
import CreateGroupButton from './CreateGroupButton';
import DropdownMenu from './DropdownMenu';
import getClients from '../fetches/getClients';
import getGroups from '../fetches/getGroups';

const Dashboard = (props) => {

  const [formVisible, setFormVisible] = useState(false);
  const toggleFormVisible = () => setFormVisible(!formVisible);

  const [newClientActive, setNewClientActive] = useState(false);
  const toggleNewClientActive = () => setNewClientActive(!newClientActive);

  const [clients, setClients] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const [groups, setGroups] = useState([]);
  const [userGroup, setUserGroup] = useState();

  const handleLogout = () => {
    Userfront.logout();
  }

  return (
    <div className="font-sans subpixel-antialiased md:pt-5 bg-gradient-to-b from-blue-500 via-green-500">
      <div className="md:container mx-auto md:rounded-xl p-2 bg-white filter md:drop-shadow-lg">
        <div className="flex flex-grow sm:justify-between mb-4">
          <div className="flex flex-grow bg-clip-text bg-gradient-to-r from-blue-500 to-green-500bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 text-transparent text-5xl font-extrabold">
            <h1 className="sm:inline-block hidden">ClientSplash</h1>
            <h1 className="sm:hidden inline-block">CS</h1>
          </div>
          <div className="flex space-x-2 items-end">
            <div>
              <CreateGroupButton setNewClientActive={setNewClientActive} setFormVisible={toggleFormVisible} className="px-2 border border-purple-300 rounded-md text-sm font-medium text-purple-500 px-2 py-2 shadow-sm bg-white hover:text-white hover:bg-purple-500 transition-all" />
            </div>
            <div>
              <DropdownMenu groups={groups} getGroups={() => getGroups(setGroups)} userGroup={userGroup} setUserGroup={setUserGroup} />
            </div>
            <div className="">
              <AddNewButton toggleNewClientActive={() => toggleNewClientActive()} newClientActive={newClientActive} setFormVisible={setFormVisible} />
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
          <ClientList getClients={() => getClients(userGroup, setMaxPages, pageNumber, setClients)} clients={clients} maxPages={maxPages} pageNumber={pageNumber} setPageNumber={setPageNumber} userGroup={userGroup} />
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
          {groups.length > 0 && !formVisible
            ? <AddNewClient userGroup={userGroup} getClients={() => getClients(userGroup, setMaxPages, pageNumber, setClients)} />
            : <CreateGroup setGroups={setGroups} setNewClientActive={setNewClientActive} setFormVisible={setFormVisible} formVisible={formVisible} getGroups={() => getGroups(setGroups)} />}
        </Transition>
      </div>
    </div>
  )
}

export default Dashboard;