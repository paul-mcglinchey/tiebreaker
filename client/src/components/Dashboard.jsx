import { Fragment, React } from 'react';

import { ClientList, Fetch, Toolbar, GroupPrompter, StatusHeader } from '.';
import { useFetch, endpoints, requestHelper } from '../utilities';

const Dashboard = ({ userGroup, setUserGroup }) => {

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groupcount, requestHelper.requestBuilder("GET"))}
      render={({ response, isLoading }) => (
        <div>
          {Number.isInteger(response.count) && (
            response.count > 0 ? (
              <Fragment>
                <Toolbar userGroup={userGroup} setUserGroup={setUserGroup}>
                  <StatusHeader isLoading={isLoading}>Dashboard</StatusHeader>
                </Toolbar>
                <ClientList
                  userGroup={userGroup}
                />
              </Fragment>
            ) : (
                <GroupPrompter />
            )
          )}
        </div>
      )}
    />
  )
}

export default Dashboard;