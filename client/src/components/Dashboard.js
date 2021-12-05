import { React } from 'react';
import { useState } from 'react';
import ClientList from './ClientList';

const Dashboard = (props) => {

  const { userGroup, getClients } = props;

  const [clients, setClients] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const toggleAddSession = () => setAddSessionOpen(!addSessionOpen);

  return (
    <div className={`font-sans subpixel-antialiased`}>
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
    </div>
  )
}

export default Dashboard;