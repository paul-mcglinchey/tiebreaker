import { Fragment, React } from 'react';

import { ClientList, Fetch, Toolbar, GroupPrompter } from '.';
import { useFetch, endpoints, requestHelper } from '../utilities';

const Dashboard = ({ userGroup, setUserGroup, status, setStatus }) => {

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groupcount, requestHelper.requestBuilder("GET"))}
      render={({ response, isLoading }) => (
        <Fragment>
          {Number.isInteger(response.count) && (
            response.count > 0 ? (
              <Fragment>
                {status.isFetchLoading = isLoading}
                <Toolbar userGroup={userGroup} setUserGroup={setUserGroup} status={status}>Dashboard</Toolbar>
                <ClientList
                  userGroup={userGroup}
                />
              </Fragment>
            ) : (
              <GroupPrompter />
            )
          )}
        </Fragment>
      )}
    />
  )
}

export default Dashboard;