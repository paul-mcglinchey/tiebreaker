import { Fragment, React, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Fetch from './Fetch/Fetch';
import endpoints from '../config/endpoints';
import { requestHelper } from '../helpers';
import { fetchHooks } from '../hooks';
import ClientList from './ClientList';
import SpinnerIcon from './icons/SpinnerIcon';
import GroupToolbar from './GroupToolbar/GroupToolbar';

const Dashboard = (props) => {

  const {
    userGroup,
    setUserGroup
  } = props;

  const [clientsLoading, setClientsLoading] = useState(false);

  const location = useLocation();

  return (
    <Fetch
      fetchOutput={fetchHooks.useFetch(endpoints.groups, requestHelper.requestBuilder("GET"))}
      render={({ response }) => (
        <div>
          {response && response.groups && (
            response.groups.length > 0 ? (
              <Fragment>
                <div className="flex justify-between pb-4 text-white">
                  <div className="flex space-x-4 text-4xl font-bold text-white tracking-wider items-baseline">
                    <span>Dashboard</span>
                    {clientsLoading && <SpinnerIcon className="text-white h-6 w-6" />}
                  </div>
                  <GroupToolbar
                    userGroup={userGroup}
                    setUserGroup={setUserGroup}
                    groups={response.groups}
                  />
                </div>
                {userGroup && (
                  <ClientList
                    userGroup={userGroup}
                    setClientsLoading={setClientsLoading}
                  />
                )}
              </Fragment>
            ) : (
              <Navigate to="/creategroup" state={{ from: location }} />
            )
          )}
        </div>
      )}
    />
  )
}

export default Dashboard;