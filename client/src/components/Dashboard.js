import { React } from 'react';
import { useState } from 'react';
import { useMountEffect } from '../helpers/useMountEffect';
import AddFirstClient from './AddFirstClient';
import ClientList from './ClientList';
import CreateGroup from './CreateGroup';
import getClients from '../requests/getClients.js';

const Dashboard = (props) => {

  const { userGroup, getGroups, groups } = props;

  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);

  const [maxPages, setMaxPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const toggleAddSession = () => setAddSessionOpen(!addSessionOpen);

  useMountEffect(getClients(userGroup, setMaxPages, pageNumber, setClients, setClientsLoading));

  return (
    <div className="">
      {groups && groups.length !== 0 ? (
        clients && clients.length !== 0 ? (
          <ClientList
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            maxPages={maxPages}
            clients={clients}
            getClients={getClients(userGroup, setMaxPages, pageNumber, setClients, setClientsLoading)}
            userGroup={userGroup}
            addSessionOpen={addSessionOpen}
            toggleAddSession={toggleAddSession}
          />
        ) : (
          clientsLoading ? (
            <div className="text-5xl font-extrabold tracking-wide text-white">
              Loading Clients
            </div>
          ) : (
            <AddFirstClient />
          )
        )
      ) : (
        <CreateGroup
          getGroups={getGroups}
        />
      )}
    </div>
  )
}

export default Dashboard;