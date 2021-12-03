import { React } from 'react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import AddNewClient from './AddNewClient';
import ClientList from './ClientList';
import CreateGroup from './CreateGroup';
import getClients from '../fetches/getClients';
import getGroups from '../fetches/getGroups';
import NavMenu from './NavMenu';

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

  return (
    <div className="font-sans subpixel-antialiased">
      <div className="flex flex-grow mb-4">
        <NavMenu
          groups={groups}
          setGroups={setGroups}
          getGroups={getGroups}
          userGroup={userGroup}
          setUserGroup={setUserGroup}
          newClientActive={newClientActive}
          setNewClientActive={setNewClientActive}
          toggleFormVisible={toggleFormVisible}
          setFormVisible={setFormVisible}
          toggleNewClientActive={toggleNewClientActive}
        />
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
  )
}

export default Dashboard;