import { React } from 'react';
import { useState } from 'react';
import { useMountEffect } from '../helpers/useMountEffect';
import AddFirstClient from './AddFirstClient';
import ClientList from './ClientList';
import CreateGroup from './CreateGroup'

const Dashboard = (props) => {

  const { userGroup, getClients, getGroups, groups } = props;

  const [clients, setClients] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const toggleAddSession = () => setAddSessionOpen(!addSessionOpen);

  useMountEffect(getClients(userGroup, setMaxPages, pageNumber, setClients));

  return (
    <div className="">
      {groups && groups.length !== 0 ? (
        <div>
          {clients && clients.length !== 0 ? (
            <ClientList
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              maxPages={maxPages}
              clients={clients}
              getClients={getClients(userGroup, setMaxPages, pageNumber, setClients)}
              userGroup={userGroup}
              addSessionOpen={addSessionOpen}
              toggleAddSession={toggleAddSession}
            />
          ) : (
            <AddFirstClient />
          )}
        </div>
      ) : (
        <CreateGroup
          getGroups={getGroups}
        />
      )}
    </div>
  )
}

export default Dashboard;