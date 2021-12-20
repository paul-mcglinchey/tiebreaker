import { Fragment, React } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Fetch, GroupToolbar, ClientList } from '.';

import { endpoints, requestHelper, useFetch } from '../utilities'

const Dashboard = (props) => {

  const {
    userGroup,
    setUserGroup
  } = props;

  const location = useLocation();

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestHelper.requestBuilder("GET"))}
      render={({ response }) => (
        <div>
          {response && response.groups && (
            response.groups.length > 0 ? (
              <Fragment>
                <div className="flex justify-between pb-4 text-white">
                  <div className="flex space-x-4 text-4xl font-bold text-white tracking-wider items-baseline">
                    <span>Dashboard</span>
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