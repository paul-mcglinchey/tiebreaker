import { Fragment, React } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useMountEffect } from '../helpers/useMountEffect';
import AddFirstClient from './AddFirstClient';

const Dashboard = (props) => {

  const {
    groups,
    groupsLoading,
    clients,
    clientsLoading
  } = props;

  const location = useLocation();
  return (
    <Fragment>
      {groups && groups.length !== 0 ? (
        clients && clients.length !== 0 ? (
          <Navigate to="clients" state={{ from: location }} />
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
        groupsLoading ? (
          <div className="text-6xl font-extrabold text-white">
            Groups Loading
          </div>
        ) : (
          < Navigate to="/creategroup" state={{ from: location }} />
        )
      )}
    </Fragment>
  )
}

export default Dashboard;