import { Fragment, React } from 'react';
import { useState } from 'react';
import { useMountEffect } from '../helpers/useMountEffect';
import AddFirstClient from './AddFirstClient';
import ClientList from './ClientList';
import CreateGroup from './CreateGroup';

const Dashboard = (props) => {

  const { 
    userGroup, 
    groups, 
    clients, 
    pageNumber, 
    setPageNumber, 
    maxPages, 
    clientsLoading, 
    getClients 
  } = props;

  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const toggleAddSession = () => setAddSessionOpen(!addSessionOpen);

  console.log(clients);

  return (
    <Fragment>
      {groups && groups.length !== 0 ? (
        clients && clients.length !== 0 ? (
          <ClientList
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            maxPages={maxPages}
            clients={clients}
            userGroup={userGroup}
            addSessionOpen={addSessionOpen}
            toggleAddSession={toggleAddSession}
            getClients={getClients}
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
        />
      )}
    </Fragment>
  )
}

export default Dashboard;