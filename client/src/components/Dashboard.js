import { React } from 'react';
import { useState } from 'react';
import ClientList from './ClientList';
import CreateGroup from './CreateGroup'

const Dashboard = (props) => {

  const { userGroup, getClients, getGroups, groups } = props;

  const [clients, setClients] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const toggleAddSession = () => setAddSessionOpen(!addSessionOpen);

  return (
    <div className="font-sans subpixel-antialiased px-2 sm:px-6 lg:px-8">
      {groups && groups.length !== 0 ? (
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
        <CreateGroup getGroups={getGroups} />
      )}
    </div>
  )
}

export default Dashboard;